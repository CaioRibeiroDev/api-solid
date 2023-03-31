import 'dotenv/config'
import { z } from 'zod'

// process.env: { NODE_ENV: 'dev, ... }

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env) // Validation

if (_env.success === false) {
  console.error('❌ invalid environment variavles', _env.error.format())

  throw new Error(' invalid environment variavles')
}

export const env = _env.data