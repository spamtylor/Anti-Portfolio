import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const STATIC_EPITAPHS = [
  "Died of scope creep.",
  "Documentation was 'coming soon'.",
  "Crushed by technical debt.",
  "It works on my machine.",
  "Abandoned for a shiny new framework.",
  "Refactored into oblivion.",
  "Fixed in the next release (never).",
  "git push --force'd to the afterlife.",
  "Awaiting PR review since 2021.",
  "console.log('Am I alive?'); // false",
  "TODO: Finish this later.",
  "Killed by a merge conflict.",
  "Suffered a fatal segmentation fault.",
  "Dependencies deprecated faster than the code.",
  "Environment variables were lost in transit.",
  "Deployed to /dev/null.",
  "The client changed their mind.",
  "Rewrite in Rust pending.",
  "404: Motivation Not Found.",
  "Feature flagged to death."
];

async function fetchGeminiRoast(repoName: string, description: string | null): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Write a specialized, short, witty, and brutal "cause of death" epitaph for a GitHub repository named "${repoName}". 
      Description: "${description || "No description provided"}".
      
      Rules:
      - Max 10 words.
      - Be funny but cynical (like a burnt-out senior dev).
      - Relate to the specific tech stack or name if possible.
      - Do NOT wrap in quotes.
      - Do NOT say "Here is an epitaph". just the text.`,
    });
    return text.trim();
  } catch (error) {
    console.error("Gemini Roast Failed:", error);
    return ""; // Fallback will handle this
  }
}

export async function generateEpitaph(repoName: string, description: string | null): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  // 1. If AI Key exists, try to be smart
  if (apiKey) {
    const roast = await fetchGeminiRoast(repoName, description);
    if (roast) return roast;
  }

  // 2. Fallback to Hybrid/Static
  const index = (repoName.length + (description?.length || 0)) % STATIC_EPITAPHS.length;
  return STATIC_EPITAPHS[index];
}
