import 'dotenv/config';
import { z } from 'zod';
const envSchema = z.object({
  PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
