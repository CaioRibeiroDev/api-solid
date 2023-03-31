import 'dotenv/config'
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if(!process.env.DATABASE_URL) throw new Error("Please provide a DATABASE_URL environment variable")

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  async setup() { //Executa antes de cada arquivo dos test
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    // Tudo que passar dentro dessa função é como se estivesse executando o comando no terminal
    execSync('npx prisma migrate deploy')

    return {
      async teardown() { //executa apos os testes executarem (para cada arquivo de test)
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      } 
    }
  }
}