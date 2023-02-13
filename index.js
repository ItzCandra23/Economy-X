"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XCoinWeb = exports.XCoin = exports.EconomyWeb = exports.EconomyX = void 0;
const event_1 = require("bdsx/event");
const src_1 = require("./src");
const translate_1 = require("./src/utils/translate");
const path = require("path");
const fs = require("fs");
let economy = {};
const economyPath = path.join(__dirname, "economy.json");
try {
    economy = require(economyPath);
}
catch (err) { }
/**Economy-X. */
var EconomyX;
(function (EconomyX) {
    /**Get currency. */
    function currency() {
        return src_1.EconomyConfig.getCurrency();
    }
    EconomyX.currency = currency;
    /**Add player data. */
    function addPlayer(player) {
        if (player.getXuid() === "")
            return false;
        if (economy.hasOwnProperty(player.getXuid()))
            return false;
        economy[player.getXuid()] = {
            money: 0,
            xcoin: 0,
        };
        return true;
    }
    EconomyX.addPlayer = addPlayer;
    /**Get player data. */
    function getPlayer(player) {
        if (!economy.hasOwnProperty(player.getXuid()))
            return null;
        return economy[player.getXuid()];
    }
    EconomyX.getPlayer = getPlayer;
    /**Add player money. */
    function addMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        data.money = data.money + amount;
        return true;
    }
    EconomyX.addMoney = addMoney;
    /**Remove player money. */
    function removeMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        if (data.money - amount < 0) {
            data.money = 0;
            return true;
        }
        data.money = data.money - amount;
        return true;
    }
    EconomyX.removeMoney = removeMoney;
    /**Set player money. */
    function setMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (economy.hasOwnProperty(player.getXuid()) === false)
            addPlayer(player);
        if (amount < 0)
            return false;
        let data = economy[player.getXuid()];
        data.money = amount;
        return true;
    }
    EconomyX.setMoney = setMoney;
    /**Get player money. */
    function getMoney(player) {
        if (player.getXuid() === undefined)
            return -1;
        if (economy.hasOwnProperty(player.getXuid()) === false)
            addPlayer(player);
        let data = economy[player.getXuid()];
        return data.money;
    }
    EconomyX.getMoney = getMoney;
    /**Transfer money player to target. */
    function transfer(player, target, amount) {
        if (player.getXuid() === "")
            return false;
        if (target.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (!economy.hasOwnProperty(target.getXuid()))
            addPlayer(target);
        let data1 = economy[player.getXuid()];
        let data2 = economy[target.getXuid()];
        if (amount < 0 || amount === 0)
            return false;
        if (data1.money - amount < 0) {
            data2.money += data1.money;
            data1.money = 0;
            return false;
        }
        data1.money -= amount;
        data2.money += amount;
        return true;
    }
    EconomyX.transfer = transfer;
    /**Save. */
    function save(message = false) {
        fs.writeFile(economyPath, JSON.stringify(economy, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    translate_1.send.error(`economy.json Error! ${err}`);
                    throw err;
                }
                else
                    translate_1.send.success(`economy.json Saved!`);
            }
        });
    }
    EconomyX.save = save;
})(EconomyX = exports.EconomyX || (exports.EconomyX = {}));
var EconomyWeb;
(function (EconomyWeb) {
    /**Check player data. */
    function check(xuid) {
        return economy.hasOwnProperty(xuid);
    }
    EconomyWeb.check = check;
    /**Get player data. */
    function getPlayer(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return null;
        return economy[xuid];
    }
    EconomyWeb.getPlayer = getPlayer;
    /**Add player money. */
    function addMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            false;
        let data = economy[xuid];
        data.money += amount;
        return true;
    }
    EconomyWeb.addMoney = addMoney;
    /**Remove player money. */
    function removeMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        if (data.money - amount < 0) {
            data.money = 0;
            return true;
        }
        data.money -= amount;
        return true;
    }
    EconomyWeb.removeMoney = removeMoney;
    /**Set player money. */
    function setMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0)
            return false;
        let data = economy[xuid];
        data.money = amount;
        return true;
    }
    EconomyWeb.setMoney = setMoney;
    /**Get player money. */
    function getMoney(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return -1;
        let data = economy[xuid];
        return data.money;
    }
    EconomyWeb.getMoney = getMoney;
})(EconomyWeb = exports.EconomyWeb || (exports.EconomyWeb = {}));
var XCoin;
(function (XCoin) {
    /**Get player X-Coin. */
    function get(player) {
        if (player.getXuid() === "")
            return -1;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        let data = economy[player.getXuid()];
        return data.xcoin;
    }
    XCoin.get = get;
    /**Add player X-Coin. */
    function add(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        data.xcoin += amount;
        return true;
    }
    XCoin.add = add;
    /**Remove player X-Coin. */
    function remove(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return true;
        }
        data.xcoin -= amount;
        return true;
    }
    XCoin.remove = remove;
    /**Set player X-Coin. */
    function set(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0)
            return false;
        let data = economy[player.getXuid()];
        data.xcoin = amount;
        return true;
    }
    XCoin.set = set;
})(XCoin = exports.XCoin || (exports.XCoin = {}));
var XCoinWeb;
(function (XCoinWeb) {
    /**Get player X-Coin. */
    function get(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return -1;
        const data = economy[xuid];
        return data.xcoin;
    }
    XCoinWeb.get = get;
    /**Add player X-Coin. */
    function add(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        data.xcoin += amount;
        return true;
    }
    XCoinWeb.add = add;
    /**Remove player X-Coin. */
    function remove(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return true;
        }
        data.xcoin -= amount;
        return true;
    }
    XCoinWeb.remove = remove;
    /**Set player X-Coin. */
    function set(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0)
            return false;
        let data = economy[xuid];
        data.xcoin = amount;
        return true;
    }
    XCoinWeb.set = set;
})(XCoinWeb = exports.XCoinWeb || (exports.XCoinWeb = {}));
event_1.events.serverOpen.on(() => {
    require("./src");
    require("./src/command");
    translate_1.send.success("Started!");
});
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverClose.on(() => {
    src_1.EconomyConfig.save(true);
    EconomyX.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMsK0JBQXNDO0FBQ3RDLHFEQUE2QztBQUM3Qyw2QkFBNkI7QUFDN0IseUJBQXlCO0FBT3pCLElBQUksT0FBTyxHQUFnQyxFQUFFLENBQUM7QUFFOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFekQsSUFBSTtJQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDbEM7QUFBQyxPQUFNLEdBQUcsRUFBRSxHQUFFO0FBRWYsZ0JBQWdCO0FBQ2hCLElBQWlCLFFBQVEsQ0ErR3hCO0FBL0dELFdBQWlCLFFBQVE7SUFDckIsbUJBQW1CO0lBQ25CLFNBQWdCLFFBQVE7UUFDcEIsT0FBTyxtQkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFGZSxpQkFBUSxXQUV2QixDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLFNBQWdCLFNBQVMsQ0FBQyxNQUFvQjtRQUMxQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTNELE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztZQUN4QixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFUZSxrQkFBUyxZQVN4QixDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLFNBQWdCLFNBQVMsQ0FBQyxNQUFvQjtRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUzRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBSmUsa0JBQVMsWUFJeEIsQ0FBQTtJQUVELHVCQUF1QjtJQUN2QixTQUFnQixRQUFRLENBQUMsTUFBb0IsRUFBRSxNQUFjO1FBQ3pELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFFLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVRlLGlCQUFRLFdBU3ZCLENBQUE7SUFFRCwwQkFBMEI7SUFDMUIsU0FBZ0IsV0FBVyxDQUFDLE1BQW9CLEVBQUUsTUFBYztRQUM1RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLENBQUMsSUFBRSxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFkZSxvQkFBVyxjQWMxQixDQUFBO0lBRUQsdUJBQXVCO0lBQ3ZCLFNBQWdCLFFBQVEsQ0FBQyxNQUFvQixFQUFFLE1BQWM7UUFDekQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxLQUFLO1lBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU3QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVRlLGlCQUFRLFdBU3ZCLENBQUE7SUFFRCx1QkFBdUI7SUFDdkIsU0FBZ0IsUUFBUSxDQUFDLE1BQW9CO1FBQ3pDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLFNBQVM7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxLQUFLO1lBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQVBlLGlCQUFRLFdBT3ZCLENBQUE7SUFFRCxzQ0FBc0M7SUFDdEMsU0FBZ0IsUUFBUSxDQUFDLE1BQW9CLEVBQUUsTUFBb0IsRUFBRSxNQUFjO1FBQy9FLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUdqRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLElBQUksTUFBTSxHQUFHLENBQUMsSUFBRSxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxLQUFLLElBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN6QixLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUNkLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsS0FBSyxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFDcEIsS0FBSyxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXBCZSxpQkFBUSxXQW9CdkIsQ0FBQTtJQUVELFdBQVc7SUFDWCxTQUFnQixJQUFJLENBQUMsVUFBbUIsS0FBSztRQUN6QyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsZ0JBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sR0FBRyxDQUFDO2lCQUNiOztvQkFDSSxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBVmUsYUFBSSxPQVVuQixDQUFBO0FBQ0wsQ0FBQyxFQS9HZ0IsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUErR3hCO0FBR0QsSUFBaUIsVUFBVSxDQTBEMUI7QUExREQsV0FBaUIsVUFBVTtJQUN2Qix3QkFBd0I7SUFDeEIsU0FBZ0IsS0FBSyxDQUFDLElBQVk7UUFDOUIsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFGZSxnQkFBSyxRQUVwQixDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLFNBQWdCLFNBQVMsQ0FBQyxJQUFZO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9DLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFIZSxvQkFBUyxZQUd4QixDQUFBO0lBRUQsdUJBQXVCO0lBQ3ZCLFNBQWdCLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUUsTUFBTSxLQUFLLENBQUM7WUFBRSxLQUFLLENBQUM7UUFFcEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxLQUFLLElBQUUsTUFBTSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFSZSxtQkFBUSxXQVF2QixDQUFBO0lBRUQsMEJBQTBCO0lBQzFCLFNBQWdCLFdBQVcsQ0FBQyxJQUFXLEVBQUUsTUFBYztRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUUsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUzQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQWJlLHNCQUFXLGNBYTFCLENBQUE7SUFFRCx1QkFBdUI7SUFDdkIsU0FBZ0IsUUFBUSxDQUFDLElBQVksRUFBRSxNQUFjO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU3QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVJlLG1CQUFRLFdBUXZCLENBQUE7SUFFRCx1QkFBdUI7SUFDdkIsU0FBZ0IsUUFBUSxDQUFDLElBQVk7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFOZSxtQkFBUSxXQU12QixDQUFBO0FBQ0wsQ0FBQyxFQTFEZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUEwRDFCO0FBRUQsSUFBaUIsS0FBSyxDQWtEckI7QUFsREQsV0FBaUIsS0FBSztJQUNsQix3QkFBd0I7SUFDeEIsU0FBZ0IsR0FBRyxDQUFDLE1BQW9CO1FBQ3BDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBTmUsU0FBRyxNQU1sQixDQUFBO0lBRUQsd0JBQXdCO0lBQ3hCLFNBQWdCLEdBQUcsQ0FBQyxNQUFvQixFQUFFLE1BQWM7UUFDcEQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFFLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxLQUFLLElBQUUsTUFBTSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFUZSxTQUFHLE1BU2xCLENBQUE7SUFFRCwyQkFBMkI7SUFDM0IsU0FBZ0IsTUFBTSxDQUFDLE1BQW9CLEVBQUUsTUFBYztRQUN2RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUUsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUzQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQWRlLFlBQU0sU0FjckIsQ0FBQTtJQUVELHdCQUF3QjtJQUN4QixTQUFnQixHQUFHLENBQUMsTUFBb0IsRUFBRSxNQUFjO1FBQ3BELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU3QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVRlLFNBQUcsTUFTbEIsQ0FBQTtBQUNMLENBQUMsRUFsRGdCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQWtEckI7QUFFRCxJQUFpQixRQUFRLENBOEN4QjtBQTlDRCxXQUFpQixRQUFRO0lBQ3JCLHdCQUF3QjtJQUN4QixTQUFnQixHQUFHLENBQUMsSUFBWTtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUxlLFlBQUcsTUFLbEIsQ0FBQTtJQUVELHdCQUF3QjtJQUN4QixTQUFnQixHQUFHLENBQUMsSUFBWSxFQUFFLE1BQWM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFFLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxLQUFLLElBQUUsTUFBTSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFSZSxZQUFHLE1BUWxCLENBQUE7SUFFRCwyQkFBMkI7SUFDM0IsU0FBZ0IsTUFBTSxDQUFDLElBQVksRUFBRSxNQUFjO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLENBQUMsSUFBRSxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsS0FBSyxJQUFFLE1BQU0sQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBYmUsZUFBTSxTQWFyQixDQUFBO0lBRUQsd0JBQXdCO0lBQ3hCLFNBQWdCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFN0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFSZSxZQUFHLE1BUWxCLENBQUE7QUFDTCxDQUFDLEVBOUNnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQThDeEI7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdkIsbUJBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyJ9