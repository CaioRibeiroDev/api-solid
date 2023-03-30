import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { RegisterUseCase } from './register'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Ts',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})