import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface ISearchGymsRequest {
  query: string
  page: number
}

interface ISearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: ISearchGymsRequest): Promise<ISearchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(
      query, 
      page
    )
  
    return {
      gyms
    };
  }
}
