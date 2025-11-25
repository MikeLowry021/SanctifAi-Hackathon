import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from project root
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Define Zod schema for environment variables
const envSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  TMDB_API_KEY: z.string().optional(),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("[Config] Failed to parse environment variables:", parsedEnv.error);
  throw new Error("Invalid environment variables");
}

// Export typed config object
export const config = {
  openaiApiKey: parsedEnv.data.OPENAI_API_KEY || null,
  tmdbApiKey: parsedEnv.data.TMDB_API_KEY || null,
};

// Log configuration summary
console.log("[Config] Loaded env:", {
  hasOpenAI: !!config.openaiApiKey,
  hasTMDB: !!config.tmdbApiKey,
});
