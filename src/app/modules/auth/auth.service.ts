import { hash, compare } from 'bcrypt';
import { Secret, sign, verify } from 'jsonwebtoken';
import {config} from '../../core/config';
import { ResolverContext } from '../../core/types/core.types';
import { UserService } from '../users/users.service';
import { ChangePasswordType, LoginType, MailType } from './types/auth.types';
import { AuthenticationError } from 'apollo-server-express';
import { TokenUserDto } from './dto/token-user.dto';
import { user } from '@prisma/client';

const service = new UserService();

export class AuthService {
  constructor() {}

  async getUser(args: LoginType, context: ResolverContext): Promise<user> {
    const user = await service.findByEmail(args, context);
    if (!user) {
      throw new AuthenticationError ('invalid credentials');
    }

    const isMatch = await compare(args.password, user.session?.password as string);

    if (!isMatch) {
      throw new AuthenticationError ('invalid credentials');
    }

    return user;
  }

  signToken(user: any): TokenUserDto {
    const payload = {
      sub: user.id,
      role: user.session.role.name
    }
    const access_token = sign(payload, config.jwtSecret as Secret);
    return {
      user,
      access_token
    };
  }

  async changePassword(
    args: ChangePasswordType,
    context: ResolverContext): Promise<string> {
    try {
      const payload = verify(args.token, config.jwtSecret as Secret);
      const payloadId = payload.sub as string

      const user = await service.findOne(
        {
          id: payloadId
        },
        context
      );

      if (user.session.recoveryToken !== args.token) {
        throw new AuthenticationError ('invalid credentials');
      }
      const hashpass = await hash(args.newPassword, 10);

      await service.update(
        {
          id: user.id,
          dto: {
            recoveryToken: null,
            password: hashpass,
          }
        },
        context);
      return 'Password changed';
    } catch (error) {
      throw new AuthenticationError ('invalid credentials');
    }
  }
}
