"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Language {
    constructor(langFile) {
        this.path = (0, path_1.join)(__dirname, "..", "..", "texts", `${langFile.replace(".lang", "")}.lang`);
    }
    translate(lang) {
        return this._langToJson().get(lang);
    }
    _langToJson() {
        const langs = (0, fs_1.readFileSync)(this.path, "utf8").split("\n").map((lang) => lang.split("="));
        const langObject = new Map();
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
exports.Language = Language;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWtDO0FBQ2xDLCtCQUE0QjtBQUU1QixNQUFhLFFBQVE7SUFHbkIsWUFBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sS0FBSyxHQUFlLElBQUEsaUJBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RyxNQUFNLFVBQVUsR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFFbEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN0QixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQXhCRCw0QkF3QkMifQ==