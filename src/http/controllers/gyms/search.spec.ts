import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Javascript Gym',
      description: 'some description',
      phone: '1119999999',
      latitude: -21.3651107,
      longitude: -48.2335278,
    })

    await request(app.server).post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Typescript Gym',
      description: 'some description',
      phone: '1119999999',
      latitude: -21.3651107,
      longitude: -48.2335278,
    })

    const response = await request(app.server).get('/gyms/search')
    .query({
      query: 'Javascript'
    })
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ])
  })
})