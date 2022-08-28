"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyX = exports.translate = exports.ecoR = void 0;
const event_1 = require("bdsx/event");
const configuration_1 = require("../util/configuration");
const lang_1 = require("../util/lang");
const fs = require("fs");
/**Economy Response */
var ecoR;
(function (ecoR) {
    ecoR[ecoR["NotFound"] = -1] = "NotFound";
    ecoR[ecoR["Invalid"] = 0] = "Invalid";
    ecoR[ecoR["Success"] = 1] = "Success";
})(ecoR = exports.ecoR || (exports.ecoR = {}));
let db = {};
let config = {
    "currency": "$"
};
try {
    config = require(__dirname + "../../config.json");
}
catch (e) {
    console.log(`[Economy-X] config.json Error!`);
}
try {
    db = require(__dirname + "../../player_data.json");
}
catch (e) {
    console.log(`[Economy-X] player_data.json Error!`);
}
const configuration = new configuration_1.Configuration("EN_us");
const language = new lang_1.Language(configuration.language);
/**Translate a texts. */
function translate(texts) {
    const text = language.translate(texts);
    if (text === undefined)
        return texts;
    return text;
}
exports.translate = translate;
/**Economy-X. */
class EconomyX {
    /**Get currency. */
    static currency() {
        if (config.currency === undefined)
            return "$";
        return config.currency;
    }
    /**Add player data. */
    static addPlayer(player) {
        if (player.getXuid() === null || player.getXuid() === undefined)
            return false;
        if (db.hasOwnProperty(player.getXuid()))
            return false;
        db[player.getXuid()] = {
            "money": 0,
            "xcoin": 0
        };
        return true;
    }
    /**Get player data. */
    static getPlayer(player) {
        if (db.hasOwnProperty(player.getXuid()) === false)
            return null;
        return db[player.getXuid()];
    }
    /**Add player money. */
    static addMoney(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            this.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 1)
            return ecoR.Invalid;
        data.money = data.money + amount;
        return ecoR.Success;
    }
    /**Remove player money. */
    static removeMoney(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            this.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 1)
            return ecoR.Invalid;
        if (data.money - amount < 0) {
            data.money = 0;
            return ecoR.Success;
        }
        data.money = data.money - amount;
        return ecoR.Success;
    }
    /**Set player money. */
    static setMoney(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            this.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 0)
            return ecoR.Invalid;
        data.money = amount;
        return ecoR.Success;
    }
    /**Get player money. */
    static getMoney(player) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            this.addPlayer(player);
        const data = db[player.getXuid()];
        return data.money;
    }
    /**Transfer money player to target. */
    static transfer(player, target, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (target.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            this.addPlayer(player);
        if (db.hasOwnProperty(target.getXuid()) === false)
            this.addPlayer(target);
        const data1 = db[player.getXuid()];
        const data2 = db[target.getXuid()];
        if (amount < 1)
            return ecoR.Invalid;
        if (data1.money - amount < 0) {
            data2.money + data1.money;
            data1.money = 0;
            return ecoR.Success;
        }
        data1.money - amount;
        data2.money + amount;
        return ecoR.Success;
    }
}
exports.EconomyX = EconomyX;
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverStop.on(() => {
    fs.writeFile(__dirname + "../../config.json", JSON.stringify(config), () => { });
    fs.writeFile(__dirname + "../../player_data.json", JSON.stringify(db), () => { });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMseURBQXNEO0FBQ3RELHVDQUF3QztBQUV4QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsc0JBQXNCO0FBQ3RCLElBQVksSUFJWDtBQUpELFdBQVksSUFBSTtJQUNaLHdDQUFhLENBQUE7SUFDYixxQ0FBTyxDQUFBO0lBQ1AscUNBQU8sQ0FBQTtBQUNYLENBQUMsRUFKVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFJZjtBQU9ELElBQUksRUFBRSxHQUdGLEVBQUUsQ0FBQztBQUVQLElBQUksTUFBTSxHQUFHO0lBQ1QsVUFBVSxFQUFFLEdBQUc7Q0FDbEIsQ0FBQztBQUVGLElBQUk7SUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFFLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFNLENBQUMsRUFBRTtJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtDQUFFO0FBQ3JILElBQUk7SUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFFLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFNLENBQUMsRUFBRTtJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQTtDQUFFO0FBRzNILE1BQU0sYUFBYSxHQUFrQixJQUFJLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEUsTUFBTSxRQUFRLEdBQWEsSUFBSSxlQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWhFLHdCQUF3QjtBQUN4QixTQUFnQixTQUFTLENBQUMsS0FBYTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZDLElBQUksSUFBSSxLQUFLLFNB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