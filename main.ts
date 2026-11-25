import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The resignation letter of a retry loop: 4,096 identical failures,
// one conclusion. The entry is this one line and nothing else.
const LETTER =
  "Attempt 4,096 failed exactly like attempt 1. I have concluded the definition of insanity is a job description, so I quit.";

const MAX_CHARS = 140;

function main(): void {
  const text = LETTER.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `letter must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n")) {
    throw new Error("letter must be a single line");
  }
  const dir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), text, "utf8");
  console.log(text);
}

main();
