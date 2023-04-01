import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
     }),
     longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
     }),
  })

  const { latitude, longitude} = nearbyGymBodySchema.parse(request.query)
  
  const featchNearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await featchNearbyGymUseCase.execute({ 
    userLatitude: latitude,
    userLongitude: longitude,
   })

  return reply.status(201).send({
    gyms
  })
}