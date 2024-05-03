import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { prisma } from "@/lib/prisma";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseParams) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } });

  if (userWithSameEmail) {
    throw new Error("E-mail already exists.");
  }

  const userRepository = new UsersRepository();

  await userRepository.create({
    email,
    name,
    password_hash,
  });
}
