import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    SECRET: z.string(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
  },

  client: {
    // Add client-side environment variables here
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
