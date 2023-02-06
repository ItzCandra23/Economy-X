"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyConfig = void 0;
const path = require("path");
const fs = require("fs");
let config = {
    currency: "$",
    language: "EN_us",
};
const configPath = path.join(__dirname, "..", "config.json");
try {
    config = require(configPath);
}
catch (err) { }
var EconomyConfig;
(function (EconomyConfig) {
    function setCurrency(currency) {
        if (currency.includes(" "))
            return false;
        if (currency === "")
            return false;
        config.currency = currency;
        return true;
    }
    EconomyConfig.setCurrency = setCurrency;
    function getCurrency() {
        return config.currency;
    }
    EconomyConfig.getCurrency = getCurrency;
    function getLanguage() {
        var _a;
        return (_a = config.language) !== null && _a !== void 0 ? _a : "EN_us";
    }
    EconomyConfig.getLanguage = getLanguage;
    function save(message = false, actor) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    console.log(`[EconomyX] config.json Error! ${err}`.red);
                    throw err;
                }
                else
                    console.log(`[EconomyX] config.json Saved!`.green);
            }
        });
    }
    EconomyConfig.save = save;
})(EconomyConfig = exports.EconomyConfig || (exports.EconomyConfig = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBR3pCLElBQUksTUFBTSxHQUdOO0lBQ0EsUUFBUSxFQUFFLEdBQUc7SUFDYixRQUFRLEVBQUUsT0FBTztDQUNwQixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRTdELElBQUk7SUFDQSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2hDO0FBQUMsT0FBTSxHQUFHLEVBQUUsR0FBRTtBQUVmLElBQWlCLGFBQWEsQ0F5QjdCO0FBekJELFdBQWlCLGFBQWE7SUFDMUIsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO1FBQ3hDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN6QyxJQUFJLFFBQVEsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFbEMsTUFBTSxDQUFDLFFBQVEsR0FBQyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQU5lLHlCQUFXLGNBTTFCLENBQUE7SUFDRCxTQUFnQixXQUFXO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRmUseUJBQVcsY0FFMUIsQ0FBQTtJQUNELFNBQWdCLFdBQVc7O1FBQ3ZCLE9BQU8sTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUZlLHlCQUFXLGNBRTFCLENBQUE7SUFDRCxTQUFnQixJQUFJLENBQUMsVUFBbUIsS0FBSyxFQUFFLEtBQW9CO1FBQy9ELEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0RSxJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxHQUFHLENBQUM7aUJBQ2I7O29CQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0Q7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFWZSxrQkFBSSxPQVVuQixDQUFBO0FBQ0wsQ0FBQyxFQXpCZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUF5QjdCIn0=