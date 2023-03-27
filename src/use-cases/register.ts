import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from "@prisma/client"

interface IRegisterUserRequest {
  name: string
  email: string
  password: string
}

interface IRegisterUserResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({name, email, password}: IRegisterUserRequest): Promise<IRegisterUserResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) throw new UserAlreadyExistsError()
  
    const user = await this.usersRepository.create({name, email, password_hash})
  
    return {
      user
    };
  }
}
