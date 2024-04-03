import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaServiceType = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
