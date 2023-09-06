"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEconomy = exports.EconomyX = void 0;
const event_1 = require("bdsx/event");
const message_1 = require("./src/utils/message");
const path = require("path");
const fs = require("fs");
let config = {
    currency: "$",
};
let economy = [];
const configPath = path.join(__dirname, "config.json");
const economyPath = path.join(__dirname, "economy.json");
try {
    config = require(configPath);
    economy = require(economyPath);
}
catch (err) { }
/**Economy-X */
var EconomyX;
(function (EconomyX) {
    /**Get economy currency */
    function currency() {
        return config.currency;
    }
    EconomyX.currency = currency;
    /**Set economy currency */
    function setCurrency(currency) {
        return config.currency = currency;
    }
    EconomyX.setCurrency = setCurrency;
    /**Add player economy */
    function addPlayer(player) {
        if (player.getXuid() === "")
            return false;
        const data = {
            xuid: player.getXuid(),
            money: 0,
            xcoin: 0,
        };
        return PlayerEconomy.addPlayer(data);
    }
    EconomyX.addPlayer = addPlayer;
    /**Get player economy */
    function getPlayer(player) {
        return PlayerEconomy.getPlayer(player);
    }
    EconomyX.getPlayer = getPlayer;
    /**Get player economy */
    function getPlayerByXuid(xuid) {
        return PlayerEconomy.getPlayerByXuid(xuid);
    }
    EconomyX.getPlayerByXuid = getPlayerByXuid;
    /**Add player money */
    function addMoney(player, amount) {
        if (player.getXuid() === "")
            return null;
        let result = null;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return addMoney(player, amount);
        }
        data.addMoney(amount)
            .then((v) => {
            result = v;
        });
        return result;
    }
    EconomyX.addMoney = addMoney;
    /**Remove player money */
    function removeMoney(player, amount) {
        if (player.getXuid() === "")
            return null;
        let result = null;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return removeMoney(player, amount);
        }
        data.removeMoney(amount)
            .then((v) => {
            result = v;
        });
        return result;
    }
    EconomyX.removeMoney = removeMoney;
    /**Set player money */
    function setMoney(player, amount) {
        if (player.getXuid() === "")
            return null;
        let result = null;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return setMoney(player, amount);
        }
        data.setMoney(amount)
            .then((v) => {
            result = v;
        });
        return result;
    }
    EconomyX.setMoney = setMoney;
    /**Get player money */
    function getMoney(player) {
        if (player.getXuid() === undefined)
            return -1;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return getMoney(player);
        }
        return data.getMoney();
    }
    EconomyX.getMoney = getMoney;
    /**Transfer money player to target */
    function transfer(player, target, amount) {
        if (player.getXuid() === "")
            return false;
        if (target.getXuid() === "")
            return false;
        const data1 = PlayerEconomy.getPlayer(player);
        const data2 = PlayerEconomy.getPlayer(target);
        if (!data1) {
            addPlayer(player);
            return transfer(player, target, amount);
        }
        if (!data2) {
            addPlayer(target);
            return transfer(player, target, amount);
        }
        if (amount < 0 || amount === 0)
            return false;
        if ((data1.money - amount) < 0) {
            data2.addMoney(data1.getMoney());
            data1.setMoney(0);
            return false;
        }
        data1.removeMoney(amount);
        data2.addMoney(amount);
        return true;
    }
    EconomyX.transfer = transfer;
    let XCoin;
    (function (XCoin) {
        /**Get player X-Coin */
        function get(player) {
            if (player.getXuid() === "")
                return 0;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return get(player);
            }
            return data.xcoin;
        }
        XCoin.get = get;
        /**Add player X-Coin */
        function add(player, amount) {
            if (player.getXuid() === "")
                return null;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return add(player, amount);
            }
            let result = null;
            data.addXCoin(amount)
                .then((v) => {
                result = v;
            });
            return result;
        }
        XCoin.add = add;
        /**Remove player X-Coin */
        function remove(player, amount) {
            if (player.getXuid() === "")
                return null;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return remove(player, amount);
            }
            let result = null;
            data.removeXCoin(amount)
                .then((v) => {
                result = v;
            });
            return result;
        }
        XCoin.remove = remove;
        /**Set player X-Coin */
        function set(player, amount) {
            if (player.getXuid() === "")
                return null;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return set(player, amount);
            }
            let result = null;
            data.setXCoin(amount)
                .then((v) => {
                result = v;
            });
            return result;
        }
        XCoin.set = set;
    })(XCoin = EconomyX.XCoin || (EconomyX.XCoin = {}));
    /**Save */
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 4), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
        fs.writeFile(economyPath, JSON.stringify(economy, null, 4), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`economy.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`economy.json Saved!`);
            }
        });
    }
    EconomyX.save = save;
})(EconomyX = exports.EconomyX || (exports.EconomyX = {}));
/**Player Economy */
class PlayerEconomy {
    constructor(xuid, money, xcoin) {
        this.xuid = xuid;
        this.money = money;
        this.xcoin = xcoin;
    }
    /**Add new player economy */
    static addPlayer(player) {
        if (this.getPlayerByXuid(player.xuid))
            return false;
        economy.push(player);
        return true;
    }
    /**Get player economy */
    static getPlayer(player) {
        const data = economy.find(data => data.xuid === player.getXuid());
        if (!data)
            return undefined;
        else
            return new PlayerEconomy(data.xuid, data.money, data.xcoin);
    }
    /**Get player economy by xuid */
    static getPlayerByXuid(xuid) {
        const data = economy.find(data => data.xuid === xuid);
        if (!data)
            return undefined;
        else
            return new PlayerEconomy(data.xuid, data.money, data.xcoin);
    }
    /**Set player money */
    async setMoney(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0) {
                reject("Invalid value!");
                return;
            }
            economy[index].money = amount;
            resolve(economy[index].money);
        });
    }
    /**Add player money */
    async addMoney(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0 || amount === 0) {
                reject("Invalid value!");
                return;
            }
            economy[index].money += amount;
            resolve(economy[index].money);
        });
    }
    /**Remove player money */
    async removeMoney(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0 || amount === 0) {
                reject("Invalid value!");
                return;
            }
            if ((this.money - amount) < 0) {
                reject(`Invalid amount!`);
                return;
            }
            economy[index].money -= amount;
            resolve(economy[index].money);
        });
    }
    /**Set player money */
    async setXCoin(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0) {
                reject("Invalid value!");
                return;
            }
            economy[index].xcoin = amount;
            resolve(economy[index].xcoin);
        });
    }
    /**Add player money */
    async addXCoin(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0 || amount === 0) {
                reject("Invalid value!");
                return;
            }
            economy[index].xcoin += amount;
            resolve(economy[index].xcoin);
        });
    }
    /**Remove player money */
    async removeXCoin(amount) {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    index = i;
            });
            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0 || amount === 0) {
                reject("Invalid value!");
                return;
            }
            if ((this.xcoin - amount) < 0) {
                reject(`Invalid amount!`);
                return;
            }
            economy[index].xcoin -= amount;
            resolve(economy[index].xcoin);
        });
    }
    /**Get player money */
    getMoney() {
        return this.money;
    }
    /**Get player x-coin */
    getXCoin() {
        return this.xcoin;
    }
}
exports.PlayerEconomy = PlayerEconomy;
event_1.events.serverOpen.on(() => {
    require("./src");
    message_1.send.success("Started!");
});
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverClose.on(() => {
    EconomyX.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMsaURBQTJDO0FBQzNDLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFRekIsSUFBSSxNQUFNLEdBRU47SUFDQSxRQUFRLEVBQUUsR0FBRztDQUNoQixDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQW9CLEVBQUUsQ0FBQztBQUVsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN2RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUV6RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QixPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ2xDO0FBQUMsT0FBTSxHQUFHLEVBQUUsR0FBRTtBQUVmLGVBQWU7QUFDZixJQUFpQixRQUFRLENBbU94QjtBQW5PRCxXQUFpQixRQUFRO0lBQ3JCLDBCQUEwQjtJQUMxQixTQUFnQixRQUFRO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRmUsaUJBQVEsV0FFdkIsQ0FBQTtJQUVELDBCQUEwQjtJQUMxQixTQUFnQixXQUFXLENBQUMsUUFBZ0I7UUFDeEMsT0FBTyxNQUFNLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRmUsb0JBQVcsY0FFMUIsQ0FBQTtJQUVELHdCQUF3QjtJQUN4QixTQUFnQixTQUFTLENBQUMsTUFBYztRQUNwQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFMUMsTUFBTSxJQUFJLEdBQUc7WUFDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRTtZ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