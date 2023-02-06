import * as fs from "fs";
import * as path from "path";

export class Language {
    public path: string;

    constructor(langFile: string) {
        this.path = path.join(__dirname , "..", "..", "texts", `${langFile.replace(".lang", "")}.lang`);
    }

    translate(lang: string): string {
        return this.convert().get(lang) ?? lang;
    }

    private convert(): Map<string, string> {
        const langs: string[][] = fs.readFileSync(this.path, "utf8").split("\n").map((lang: string) => lang.split("="));
        const langObject: Map<string, string> = new Map<string, string>();

        for (let i = 0; i < langs.length; i++) {
        for (let j = 0; j < langs[i].length; j += 2) {
            if (langs[i][j] !== "") {
                langObject.set(langs[i][j], langs[i][j + 1]);
            }
        }
        }
        return langObject;
    }
}