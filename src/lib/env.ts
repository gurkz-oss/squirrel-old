import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    TOKEN: z.string().min(12),
  },
  runtimeEnv: process.env,
});
