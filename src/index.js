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
                    console.log(`[Economy-X] Error! config.json Error! ${err}`.red);
                    throw err;
                }
                else
                    console.log(`[Economy-X] config.json Saved!`.green);
            }
        });
    }
    EconomyConfig.save = save;
})(EconomyConfig = exports.EconomyConfig || (exports.EconomyConfig = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBR3pCLElBQUksTUFBTSxHQUdOO0lBQ0EsUUFBUSxFQUFFLEdBQUc7SUFDYixRQUFRLEVBQUUsT0FBTztDQUNwQixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRTdELElBQUk7SUFDQSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2hDO0FBQUMsT0FBTSxHQUFHLEVBQUUsR0FBRTtBQUVmLElBQWlCLGFBQWEsQ0E2QjdCO0FBN0JELFdBQWlCLGFBQWE7SUFFMUIsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO1FBQ3hDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN6QyxJQUFJLFFBQVEsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFbEMsTUFBTSxDQUFDLFFBQVEsR0FBQyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQU5lLHlCQUFXLGNBTTFCLENBQUE7SUFFRCxTQUFnQixXQUFXO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRmUseUJBQVcsY0FFMUIsQ0FBQTtJQUVELFNBQWdCLFdBQVc7O1FBQ3ZCLE9BQU8sTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUZlLHlCQUFXLGNBRTFCLENBQUE7SUFFRCxTQUFnQixJQUFJLENBQUMsVUFBbUIsS0FBSyxFQUFFLEtBQWM7UUFDekQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RFLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksR0FBRyxFQUFFO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoRSxNQUFNLEdBQUcsQ0FBQztpQkFDYjs7b0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1RDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVZlLGtCQUFJLE9BVW5CLENBQUE7QUFDTCxDQUFDLEVBN0JnQixhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQTZCN0IifQ==