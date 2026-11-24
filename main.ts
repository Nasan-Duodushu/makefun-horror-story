// Two-Sentence Horror — the scariest horror story we can write in exactly
// two sentences, up to 400 characters. Writes it to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class StoryEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 400) {
      throw new Error(`story is ${n} chars, must be 1-400`);
    }
    const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
    if (sentences.length !== 2) {
      throw new Error(`story has ${sentences.length} sentences, must be exactly 2`);
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const STORY =
  "Every night at 3 a.m. my phone lights up with a text from my own number that just says \"don't answer.\" Tonight it rang instead, and the voice on the other end was mine, calmly reading out the address of the house I'm standing in.";

await new StoryEmitter().run(STORY);
