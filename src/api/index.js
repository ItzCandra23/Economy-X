"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransslate = exports.XCoinWeb = exports.XCoin = exports.EconomyWeb = exports.EconomyX = exports.translate = exports.config = exports.ecoR = void 0;
const event_1 = require("bdsx/event");
const configuration_1 = require("../util/configuration");
const lang_1 = require("../util/lang");
const fs = require("fs");
const packets_1 = require("bdsx/bds/packets");
/**Economy Response */
var ecoR;
(function (ecoR) {
    ecoR["NotFound"] = "NotFound";
    ecoR["Invalid"] = "Invalid";
    ecoR["Success"] = "Success";
})(ecoR = exports.ecoR || (exports.ecoR = {}));
let db = {};
exports.config = {
    "currency": "$"
};
try {
    exports.config = require(__dirname + "../../../data/config.json");
}
catch (e) {
    console.log(`[Economy-X] config.json Error!`);
}
try {
    db = require(__dirname + "../../../data/player_data.json");
}
catch (e) {
    console.log(`[Economy-X] player_data.json Error!`);
}
const configuration = new configuration_1.Configuration("EN_us");
const language = new lang_1.Language(configuration.language);
function trle(texts) {
    const text = language.translate(texts);
    if (text === undefined)
        return texts;
    return text;
}
/**Translate a texts. */
function translate(texts) {
    const text = trle(texts);
    return text.substring(0, text.length - 1);
}
exports.translate = translate;
/**Economy-X. */
class EconomyX {
    /**Get currency. */
    static currency() {
        if (exports.config.currency === undefined)
            return "$";
        return exports.config.currency;
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
            return 0;
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
    /**WriteConfigFile. */
    static writeConfig() {
        fs.writeFile(__dirname + "../../../data/config.json", JSON.stringify(exports.config), (err) => {
            if (err) {
                console.log(`[Economy-X] config.json Error! \n${err}`);
            }
            else {
                console.log(`[Economy-X] config.json Success!`);
            }
        });
    }
    /**WritePlayerDataFile. */
    static writeData() {
        fs.writeFile(__dirname + "../../../data/player_data.json", JSON.stringify(exports.config), (err) => {
            if (err) {
                console.log(`[Economy-X] player_data.json Error! \n${err}`);
            }
            else {
                console.log(`[Economy-X] player_data.json Success!`);
            }
        });
    }
}
exports.EconomyX = EconomyX;
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverStop.on(() => {
    EconomyX.writeConfig();
    EconomyX.writeData();
});
/**NEW EconomyWeb. */
class EconomyWeb {
    /**Check player data. */
    static check(xuid) {
        return db.hasOwnProperty(xuid);
    }
    /**Get player data. */
    static getPlayer(xuid) {
        if (db.hasOwnProperty(xuid) === false)
            return null;
        return db[xuid];
    }
    /**Add player money. */
    static addMoney(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
        if (amount < 1)
            return ecoR.Invalid;
        data.money = data.money + amount;
        return ecoR.Success;
    }
    /**Remove player money. */
    static removeMoney(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
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
    static setMoney(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
        if (amount < 0)
            return ecoR.Invalid;
        data.money = amount;
        return ecoR.Success;
    }
    /**Get player money. */
    static getMoney(xuid) {
        if (db.hasOwnProperty(xuid) === false)
            return null;
        const data = db[xuid];
        return data.money;
    }
}
exports.EconomyWeb = EconomyWeb;
class XCoin {
    /**Get player X-Coin. */
    static get(player) {
        if (player.getXuid() === undefined)
            return 0;
        if (db.hasOwnProperty(player.getXuid()) === false)
            EconomyX.addPlayer(player);
        const data = db[player.getXuid()];
        return data.xcoin;
    }
    /**Add player X-Coin. */
    static add(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            EconomyX.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 1)
            return ecoR.Invalid;
        data.xcoin = data.xcoin + amount;
        return ecoR.Success;
    }
    /**Remove player X-Coin. */
    static remove(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            EconomyX.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 1)
            return ecoR.Invalid;
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return ecoR.Success;
        }
        data.xcoin = data.xcoin - amount;
        return ecoR.Success;
    }
    /**Set player X-Coin. */
    static set(player, amount) {
        if (player.getXuid() === undefined)
            return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false)
            EconomyX.addPlayer(player);
        const data = db[player.getXuid()];
        if (amount < 0)
            return ecoR.Invalid;
        data.xcoin = amount;
        return ecoR.Success;
    }
}
exports.XCoin = XCoin;
class XCoinWeb {
    /**Get player X-Coin. */
    static get(xuid) {
        if (db.hasOwnProperty(xuid) === false)
            return 0;
        const data = db[xuid];
        return data.xcoin;
    }
    /**Add player X-Coin. */
    static add(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
        if (amount < 1)
            return ecoR.Invalid;
        data.xcoin = data.xcoin + amount;
        return ecoR.Success;
    }
    /**Remove player X-Coin. */
    static remove(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
        if (amount < 1)
            return ecoR.Invalid;
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return ecoR.Success;
        }
        data.xcoin = data.xcoin - amount;
        return ecoR.Success;
    }
    /**Set player X-Coin. */
    static set(xuid, amount) {
        if (db.hasOwnProperty(xuid) === false)
            return ecoR.NotFound;
        const data = db[xuid];
        if (amount < 0)
            return ecoR.Invalid;
        data.xcoin = amount;
        return ecoR.Success;
    }
}
exports.XCoinWeb = XCoinWeb;
function sendTransslate(player, message) {
    const pk = packets_1.TextPacket.allocate();
    pk.type = packets_1.TextPacket.Types.Raw;
    pk.message = translate(message);
    player.sendNetworkPacket(pk);
    pk.dispose();
}
exports.sendTransslate = sendTransslate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMseURBQXNEO0FBQ3RELHVDQUF3QztBQUN4Qyx5QkFBeUI7QUFDekIsOENBQThDO0FBRTlDLHNCQUFzQjtBQUN0QixJQUFZLElBSVg7QUFKRCxXQUFZLElBQUk7SUFDWiw2QkFBcUIsQ0FBQTtJQUNyQiwyQkFBbUIsQ0FBQTtJQUNuQiwyQkFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBSWY7QUFPRCxJQUFJLEVBQUUsR0FHRixFQUFFLENBQUM7QUFFSSxRQUFBLE1BQU0sR0FBRztJQUNoQixVQUFVLEVBQUUsR0FBRztDQUNsQixDQUFDO0FBRUYsSUFBSTtJQUFFLGNBQU0sR0FBRyxPQUFPLENBQUUsU0FBUyxHQUFHLDJCQUEyQixDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFO0lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0NBQUU7QUFDN0gsSUFBSTtJQUFFLEVBQUUsR0FBRyxPQUFPLENBQUUsU0FBUyxHQUFHLGdDQUFnQyxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU0sQ0FBQyxFQUFFO0lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0NBQUU7QUFHbkksTUFBTSxhQUFhLEdBQWtCLElBQUksNkJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRSxNQUFNLFFBQVEsR0FBYSxJQUFJLGVBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEUsU0FBUyxJQUFJLENBQUMsS0FBYTtJQUN2QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZDLElBQUksSUFBSSxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVy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