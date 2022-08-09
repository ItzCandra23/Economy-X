"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyX = void 0;
const event_1 = require("bdsx/event");
const fs = require("fs");
let db = {};
let config = {
    "currency": "$",
    "new_player_money": 100
};
try {
    config = require(__dirname + '/data/config.json');
}
catch (e) { }
try {
    db = require(__dirname + '/data/economy.json');
}
catch (e) { }
/**Economy-X: Added economy system for BDSX.*/
class EconomyX {
    static currency() {
        return config.currency;
    }
    /**Add player data.*/
    static addPlayer(player) {
        if (db.hasOwnProperty(player.getName()))
            return false;
        db[player.getName()] = {
            "name": player.getName(),
            "money": config.new_player_money,
            "xcoin": 0
        };
        return true;
    }
    /**Get player data.*/
    static getPlayer(player) {
        this.addPlayer(player);
        return db[player.getName()];
    }
    /**Get player money.*/
    static getMoney(player) {
        this.addPlayer(player);
        return db[player.getName()].money;
    }
    /**Add player money.*/
    static addMoney(player, amount) {
        this.addPlayer(player);
        const data = db[player.getName()];
        if (amount < 0)
            return 0;
        if (amount === 0)
            return 0;
        data.money += amount;
        return amount;
    }
    /**Remove player money.*/
    static removeMoney(player, amount) {
        this.addPlayer(player);
        const data = db[player.getName()];
        if (amount < 0)
            return 0;
        if (amount === 0)
            return 0;
        if (data.money - amount < 0) {
            data.money = 0;
            return data.money;
        }
        data.money -= amount;
        return amount;
    }
    /**Set player money.*/
    static setMoney(player, amount) {
        this.addPlayer(player);
        const data = db[player.getName()];
        if (amount < 0)
            return 0;
        data.money = amount;
        return amount;
    }
    /**Transfer player money to other player.*/
    static transfer(player, target, amount) {
        this.addPlayer(player);
        this.addPlayer(target);
        const data1 = db[player.getName()];
        const data2 = db[target.getName()];
        if (data1 === data2)
            return 0;
        if (amount < 0)
            return 0;
        if (amount === 0)
            return 0;
        if (data1.money - amount < 0)
            return 0;
        data1.money -= amount;
        data2.money += amount;
        return amount;
    }
    static save() {
        fs.writeFile(__dirname + '/data/config.json', JSON.stringify(config), () => { });
        fs.writeFile(__dirname + '/data/economy.json', JSON.stringify(db), () => { });
        console.log(`[Economy-X] Save.`);
    }
    static saveSync() {
        fs.writeFileSync(__dirname + '/data/config.json', JSON.stringify(config), () => { });
        fs.writeFileSync(__dirname + '/data/economy.json', JSON.stringify(db), () => { });
        console.log(`[Economy-X] SaveSync.`);
    }
}
exports.EconomyX = EconomyX;
event_1.events.serverStop.on(() => {
    EconomyX.save();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFFcEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLElBQUksRUFBRSxHQUFvQyxFQUFFLENBQUM7QUFRN0MsSUFBSSxNQUFNLEdBQUc7SUFDVCxVQUFVLEVBQUUsR0FBRztJQUNmLGtCQUFrQixFQUFFLEdBQUc7Q0FDMUIsQ0FBQztBQUVGLElBQUk7SUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBQ3RFLElBQUk7SUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBRW5FLDhDQUE4QztBQUM5QyxNQUFhLFFBQVE7SUFDakIsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW9CO1FBQ2pDLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV0RCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW9CO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHNCQUFzQjtJQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQW9CO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFvQixFQUFFLE1BQWM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbEMsSUFBSSxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLElBQUksTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxJQUFFLE1BQU0sQ0FBQztRQUNuQixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBb0IsRUFBRSxNQUFjO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxDLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsS0FBSyxJQUFFLE1BQU0sQ0FBQztRQUNuQixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQXNCO0lBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBb0IsRUFBRSxNQUFjO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxDLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQztRQUNsQixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBb0IsRUFBRSxNQUFvQixFQUFFLE1BQWM7UUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNuQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbkMsSUFBSSxLQUFLLEtBQUssS0FBSztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFFckMsS0FBSyxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFDcEIsS0FBSyxDQUFDLEtBQUssSUFBRSxNQUFNLENBQUM7UUFFcEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJO1FBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUNoRixFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDSjtBQW5HRCw0QkFtR0M7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDIn0=