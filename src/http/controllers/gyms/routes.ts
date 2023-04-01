import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middleware/verify-jwt";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // Todas as rotas que estiver dentro desse arquivo vão chamar o middleware
}