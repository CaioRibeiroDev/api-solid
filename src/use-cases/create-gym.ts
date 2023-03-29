import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface ICreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface ICreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({description, latitude, longitude, phone, title}: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title, 
      description, 
      latitude, 
      longitude, 
      phone
    })
  
    return {
      gym
    };
  }
}
