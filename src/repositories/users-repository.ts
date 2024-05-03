import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepositoryType } from "./users-repository-types";

export class UsersRepository implements UsersRepositoryType {
  async findByEmail(email: string) {
    const user = prisma.user.findUnique({ where: { email } });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
