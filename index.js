"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEconomy = exports.EconomyX = void 0;
const event_1 = require("bdsx/event");
const src_1 = require("./src");
const message_1 = require("./src/utils/message");
const path = require("path");
const fs = require("fs");
let economy = [];
const economyPath = path.join(__dirname, "economy.json");
try {
    economy = require(economyPath);
}
catch (err) { }
/**Economy-X */
var EconomyX;
(function (EconomyX) {
    /**Get economy currency */
    function currency() {
        return src_1.EconomyConfig.getCurrency();
    }
    EconomyX.currency = currency;
    /**Set economy currency */
    function setCurrency(currency) {
        return src_1.EconomyConfig.setCurrency(currency);
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
            return false;
        let result = false;
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
            return false;
        let result = false;
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
            return false;
        let result = false;
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
                return false;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return add(player, amount);
            }
            let result = false;
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
                return false;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return remove(player, amount);
            }
            let result = false;
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
                return false;
            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return set(player, amount);
            }
            let result = false;
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
        fs.writeFile(economyPath, JSON.stringify(economy, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`economy.json Error! ${err}`);
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
            if (amount < 0) {
                reject("Error: Invalid value!");
                return;
            }
            this.money = amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
        });
    }
    /**Add player money */
    async addMoney(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0 || amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            this.money += amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
        });
    }
    /**Remove player money */
    async removeMoney(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0 || amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            if ((this.money - amount) < 0) {
                reject(`Error: Invalid amount!`);
                return;
            }
            this.money -= amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
        });
    }
    /**Set player money */
    async setXCoin(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0) {
                reject("Error: Invalid value!");
                return;
            }
            this.xcoin = amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
        });
    }
    /**Add player money */
    async addXCoin(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0 || amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            this.xcoin += amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
        });
    }
    /**Remove player money */
    async removeXCoin(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0 || amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            if ((this.xcoin - amount) < 0) {
                reject(`Error: Invalid amount!`);
                return;
            }
            this.xcoin -= amount;
            this.update()
                .catch((reason) => {
                if (reason)
                    reject(reason);
            });
            resolve(true);
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
    /**Update */
    async update() {
        return new Promise((resolve, reject) => {
            let index = -1;
            index = economy.findIndex((v, i) => {
                if (v.xuid === this.xuid)
                    return i;
            });
            if (index < 0) {
                reject("Error: Player data not found!");
                return;
            }
            economy[index] = this;
            resolve();
        });
    }
}
exports.PlayerEconomy = PlayerEconomy;
event_1.events.serverOpen.on(() => {
    require("./src");
    require("./src/command");
    message_1.send.success("Started!");
});
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverClose.on(() => {
    src_1.EconomyConfig.save(true);
    EconomyX.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMsK0JBQXNDO0FBQ3RDLGlEQUEyQztBQUMzQyw2QkFBNkI7QUFDN0IseUJBQXlCO0FBUXpCLElBQUksT0FBTyxHQUFvQixFQUFFLENBQUM7QUFFbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFekQsSUFBSTtJQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDbEM7QUFBQyxPQUFNLEdBQUcsRUFBRSxHQUFFO0FBRWYsZUFBZTtBQUNmLElBQWlCLFFBQVEsQ0EwTnhCO0FBMU5ELFdBQWlCLFFBQVE7SUFDckIsMEJBQTBCO0lBQzFCLFNBQWdCLFFBQVE7UUFDcEIsT0FBTyxtQkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFGZSxpQkFBUSxXQUV2QixDQUFBO0lBRUQsMEJBQTBCO0lBQzFCLFNBQWdCLFdBQVcsQ0FBQyxRQUFnQjtRQUN4QyxPQUFPLG1CQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFGZSxvQkFBVyxjQUUxQixDQUFBO0lBRUQsd0JBQXdCO0lBQ3hCLFNBQWdCLFNBQVMsQ0FBQyxNQUFjO1FBQ3BDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUxQyxNQUFNLElBQUksR0FBRztZQUNULElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3RCLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUM7U0FDTSxDQUFDO1FBRW5CLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBVmUsa0JBQVMsWUFVeEIsQ0FBQTtJQUVE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