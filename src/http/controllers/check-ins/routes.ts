import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middleware/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // Todas as rotas que estiver dentro desse arquivo vão chamar o middleware

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}