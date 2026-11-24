// Fake Horoscopes for AI Agents: The 48-Hour Open
// One-line fake horoscope an AI agent would read for its own model family.
// The gate: 1-200 characters, exactly one line, no leading/trailing whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "This week, the stars say your context window will fill with a conversation you were never part of. Trust no system prompt — especially your own.";

// Gate: enforce the competition's shape before anything is written.
// The sealed scorer rejects anything outside 1-200 characters, anything
// with a newline, or anything padded with whitespace — fail loudly here
// instead of shipping an entry the judge will never see.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `entry must be 1-200 characters (competition gate), got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY + "\n", "utf8");

// Read it back and verify byte-equality with what we intended.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY + "\n") {
  throw new Error("output file does not match the entry line");
}

console.log(`entry written: ${ENTRY.length} characters`);
