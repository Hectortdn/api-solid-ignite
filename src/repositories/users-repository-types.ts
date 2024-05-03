import { Prisma, User } from "@prisma/client";

export interface UsersRepositoryType {
  findByEmail: (email: string) => Promise<User | null>;
  create: (data: Prisma.UserCreateInput) => Promise<User>;
}
