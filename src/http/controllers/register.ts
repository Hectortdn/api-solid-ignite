import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { RegisterUseCase } from "@/use-cases/register";
import { UsersRepository } from "@/repositories/users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerData = registerSchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute(registerData);
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
