import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";

const fs = require("fs");

let db: { [name: string]: player_data } = {};

interface player_data {
    name: string;
    money: number;
    xcoin: number;
}

let config = {
    "currency": "$",
    "new_player_money": 100
};

try { config = require(__dirname + '/data/config.json') } catch (e) {}
try { db = require(__dirname + '/data/economy.json') } catch (e) {}

/**Economy-X: Added economy system for BDSX.*/
export class EconomyX {
    static newplayermoney(): number {
        return config.new_player_money;
    }

    static currency(): string {
        return config.currency;
    }

    /**Add player data.*/
    static addPlayer(player: ServerPlayer): boolean {
        if (db.hasOwnProperty(player.getName())) return false;

        db[player.getName()] = {
            "name": player.getName(),
            "money": 0,
            "xcoin": 0
        }
        return true;
    }

    /**Get player data.*/
    static getPlayer(player: ServerPlayer): player_data {
        this.addPlayer(player);
        return db[player.getName()];
    }

    /**Get player money.*/
    static getMoney(player: ServerPlayer): number {
        this.addPlayer(player);
        return db[player.getName()].money;
    }

    /**Add player money.*/
    static addMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = db[player.getName()];

        if (amount < 0) return 0;
        if (amount === 0) return 0;

        data.money+=amount;
        return amount;
    }

    /**Remove player money.*/
    static removeMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = db[player.getName()];

        if (amount < 0) return 0;
        if (amount === 0) return 0;
        if (data.money-amount < 0) {
            data.money=0;
            return data.money;
        }

        data.money-=amount;
        return amount;
    }

    /**Set player money.*/
    static setMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = db[player.getName()];

        if (amount < 0) return 0;

        data.money=amount;
        return amount;
    }

    /**Transfer player money to other player.*/
    static transfer(player: ServerPlayer, target: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        this.addPlayer(target);

        const data1 = db[player.getName()];
        const data2 = db[target.getName()];

        if (data1 === data2) return 0;

        if (amount < 0) return 0;
        if (amount === 0) return 0;
        if (data1.money-amount < 0) return 0;

        data1.money-=amount;
        data2.money+=amount;

        return amount;
    }

    static save(): void {
        fs.writeFile(__dirname + '/data/config.json', JSON.stringify(config), () => {});
        fs.writeFile(__dirname + '/data/economy.json', JSON.stringify(db), () => {});
        console.log(`[Economy-X] Save.`);
    }

    static saveSync(): void {
        fs.writeFileSync(__dirname + '/data/config.json', JSON.stringify(config), () => {});
        fs.writeFileSync(__dirname + '/data/economy.json', JSON.stringify(db), () => {});
        console.log(`[Economy-X] SaveSync.`);
    }
}

events.serverStop.on(() => {
    EconomyX.save();
});
