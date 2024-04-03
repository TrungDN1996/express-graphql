import type { Boom } from '@hapi/boom'
import { user } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';
import { ResolverContext } from '../../core/types/core.types';
import { FindOneType, FindOptions } from './types/user.types';
import { UserService } from './users.service';
import { jwtGuard } from '../../utils/auth/guards/jwtGuard.guard';

const userService = new UserService();

export async function allUsers(
  args: FindOptions,
  context: ResolverContext
): Promise<user[] | Boom> {
  const users = await userService.findAll(args, context);
  return users;
};

export async function user(
  args: FindOneType,
  context: ResolverContext
): Promise<user | Boom> {
  const user = await userService.findOne(args, context);
  return user;
};

export async function addUser(
  args: CreateUserDto,
  context: ResolverContext
): Promise<user | Boom> {
  await jwtGuard(context)
  const newUser = await userService.create(args, context);
  return newUser;
};

export async function updateUser(
  args: UpdateUSerDto,
  context: ResolverContext
): Promise<user | Boom> {
  await jwtGuard(context)
  const updateUser = await userService.update(args, context);
  return updateUser;
};

export async function deleteUser(
  args: FindOneType,
  context: ResolverContext
): Promise<number | Boom> {
  await jwtGuard(context)
  const deleteUser = userService.delete(args, context);
  return deleteUser;
};
