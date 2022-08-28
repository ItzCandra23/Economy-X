import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { Configuration } from "../util/configuration";
import { Language } from "../util/lang";

const fs = require("fs");

/**Economy Response */
export enum ecoR {
    NotFound = -1,
    Invalid,
    Success,
}

interface player_data {
    money: number;
    xcoin: number;
}

let db: {
    [xuid: string]:
    player_data
} = {};

let config = {
    "currency": "$"
};

try { config = require( __dirname + "../../config.json") } catch(e) { console.log(`[Economy-X] config.json Error!`) }
try { db = require( __dirname + "../../player_data.json") } catch(e) { console.log(`[Economy-X] player_data.json Error!`) }


const configuration: Configuration = new Configuration("EN_us");
const language: Language = new Language(configuration.language);

/**Translate a texts. */
export function translate(texts: string): string {
    const text = language.translate(texts);

    if (text === undefined) return texts;

    return text;
}

/**Economy-X. */
export class EconomyX {
    /**Get currency. */
    static currency(): string {
        if (config.currency === undefined) return "$";
        return config.currency;
    }

    /**Add player data. */
    static addPlayer(player: ServerPlayer): boolean {
        if (player.getXuid() === null||player.getXuid() === undefined) return false;
        if (db.hasOwnProperty(player.getXuid())) return false;

        db[player.getXuid()] = {
            "money": 0,
            "xcoin": 0
        }
        return true;
    }

    /**Get player data. */
    static getPlayer(player: ServerPlayer): player_data|null {
        if (db.hasOwnProperty(player.getXuid()) === false) return null;

        return db[player.getXuid()];
    }

    /**Add player money. */
    static addMoney(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) this.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 1) return ecoR.Invalid;

        data.money=data.money+amount;
        return ecoR.Success;
    }

    /**Remove player money. */
    static removeMoney(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) this.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 1) return ecoR.Invalid;
        if (data.money-amount < 0) {
            data.money=0;
            return ecoR.Success;
        }

        data.money=data.money-amount;
        return ecoR.Success;
    }

    /**Set player money. */
    static setMoney(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) this.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 0) return ecoR.Invalid;

        data.money=amount;
        return ecoR.Success;
    }

    /**Get player money. */
    static getMoney(player: ServerPlayer): number {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) this.addPlayer(player);

        const data = db[player.getXuid()];

        return data.money;
    }

    /**Transfer money player to target. */
    static transfer(player: ServerPlayer, target: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (target.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) this.addPlayer(player);
        if (db.hasOwnProperty(target.getXuid()) === false) this.addPlayer(target);


        const data1 = db[player.getXuid()];
        const data2 = db[target.getXuid()];

        if (amount < 1) return ecoR.Invalid;
        if (data1.money-amount < 0) {
            data2.money+data1.money;
            data1.money=0;
            return ecoR.Success;
        }

        data1.money-amount;
        data2.money+amount;
        return ecoR.Success;
    }
}

events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});

events.serverStop.on(() => {
    fs.writeFile(__dirname + "../../config.json", JSON.stringify(config), () => {});
    fs.writeFile(__dirname + "../../player_data.json", JSON.stringify(db), () => {});
});