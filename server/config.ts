import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  tmdbApiKey: process.env.TMDB_API_KEY ?? "",
};

console.log("[Config] Environment variables loaded:", {
  openaiApiKey: config.openaiApiKey ? "SET ✓" : "MISSING ✗",
  tmdbApiKey: config.tmdbApiKey ? "SET ✓" : "MISSING ✗",
});
