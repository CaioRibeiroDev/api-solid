import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

interface IUserRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({name, email, password}: IUserRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) throw new UserAlreadyExistsError()
  
    await this.usersRepository.create({name, email, password_hash})
  }
}
