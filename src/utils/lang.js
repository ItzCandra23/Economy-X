"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const fs = require("fs");
const path = require("path");
class Language {
    constructor(langFile) {
        this.path = path.join(__dirname, "..", "..", "texts", `${langFile.replace(".lang", "")}.lang`);
    }
    translate(lang) {
        var _a;
        return (_a = this.convert().get(lang)) !== null && _a !== void 0 ? _a : lang;
    }
    convert() {
        const langs = fs.readFileSync(this.path, "utf8").split("\n").map((lang) => lang.split("="));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUU3QixNQUFhLFFBQVE7SUFHakIsWUFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTs7UUFDbEIsT0FBTyxNQUFBLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFJLElBQUksQ0FBQztJQUM1QyxDQUFDO0lBRU8sT0FBTztRQUNYLE1BQU0sS0FBSyxHQUFlLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEgsTUFBTSxVQUFVLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRWxFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDcEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO1NBQ0E7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUF4QkQsNEJBd0JDIn0=