import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -21.1811514,
      longitude: -47.8014106,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -21.3748721,
      longitude: -48.2344925,
      description: null,
      phone: null
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.3748915,
      userLongitude: -48.2342471,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })
})