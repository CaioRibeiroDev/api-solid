import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface IFetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: IFetchNearbyGymsRequest): Promise<IFetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude, 
      longitude: userLongitude
    })
  
    return {
      gyms
    };
  }
}
