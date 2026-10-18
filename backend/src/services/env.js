import "dotenv/config"
import { z } from "zod"
const schema = z.object({
  DATABASE_PASSWORD: z.url(),
  URL_SUPABASE_CONNECT: z.string().min(1),
  BREVO_API: z.string().min(32),
  BREVO_FROM_EMAIL: z.string().default("dipesh77gautam+brevo@gmail.com"),
  JSON_SECRET_KEY: z.string(),
  CLIENT_BASE_URL: z.string().default("http://localhost:5173"),
  PORT: z.coerce.number().optional(),
  MAXAGE: z.coerce.number(),
  GROK_API:z.string().min(12)
})
const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  const keys = Object.keys(z.flattenError(parsed.error).fieldErrors)
  console.error(`missing or invalid env keys, server wont work: ${keys.join(", ")}`)
  // console.error("Please Enter all the env keys", envKey);
  process.exit(1)
}
export const env = parsed.data