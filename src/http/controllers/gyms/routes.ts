import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middleware/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // Todas as rotas que estiver dentro desse arquivo vão chamar o middleware

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}