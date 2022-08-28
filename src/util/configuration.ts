import { existsSync, readFileSync, writeFileSync } from "fs";

export class Configuration {
  public language: string;

  constructor(path: string) {
    if (!existsSync(path)) {
      writeFileSync(path, JSON.stringify({ language: "EN_us" }));
    }
    this.language = JSON.parse(readFileSync(path, "utf8")).language;
  }
}
