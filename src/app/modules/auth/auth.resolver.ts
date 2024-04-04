import { ResolverContext } from '../../core/types/core.types';
import { AuthService } from './auth.service';
import { TokenUserDto } from './dto/token-user.dto';
import { ChangePasswordType, LoginType } from './types/auth.types';

const service = new AuthService();

export async function login(
  args: LoginType,
  context: ResolverContext
): Promise<TokenUserDto> {
  const { email, password } = args;
  const gqlLocalAuth = await context.build?.authenticate('graphql-local', {email , password});

  return service.signToken(gqlLocalAuth?.user)
}


export async function changePassword(
  parent: unknown,
  args: ChangePasswordType,
  context: ResolverContext
): Promise<string> {
  const { token, newPassword } = args;
  const response = await service.changePassword(parent, {token, newPassword}, context);
  return response
}
