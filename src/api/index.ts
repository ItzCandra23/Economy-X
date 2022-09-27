import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { Configuration } from "../util/configuration";
import { Language } from "../util/lang";
import * as fs from "fs";
import { TextPacket } from "bdsx/bds/packets";

/**Economy Response */
export enum ecoR {
    NotFound = "NotFound",
    Invalid = "Invalid",
    Success = "Success",
}

interface player_data {
    money: number;
    xcoin: number;
}

let db: {
    [xuid: string]:
    player_data
} = {};

export let config = {
    "currency": "$"
};

try { config = require( __dirname + "../../../data/config.json") } catch(e) { console.log(`[Economy-X] config.json Error!`) }
try { db = require( __dirname + "../../../data/player_data.json") } catch(e) { console.log(`[Economy-X] player_data.json Error!`) }


const configuration: Configuration = new Configuration("EN_us");
const language: Language = new Language(configuration.language);

function trle(texts: string): string {
    const text = language.translate(texts);

    if (text === undefined) return texts;

    return text;
}

/**Translate a texts. */
export function translate(texts: string): string {
    const text = trle(texts);
    return text.substring(0, text.length-1);
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
        if (player.getXuid() === undefined) return 0;
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

    /**WriteConfigFile. */
    static writeConfig(): void {
        fs.writeFile(__dirname + "../../../data/config.json", JSON.stringify(config), (err) => {
            if (err) {
                console.log(`[Economy-X] config.json Error! \n${err}`);
            } else {
                console.log(`[Economy-X] config.json Success!`);
            }
        });
    }

    /**WritePlayerDataFile. */
    static writeData(): void {
        fs.writeFile(__dirname + "../../../data/player_data.json", JSON.stringify(db), (err) => {
            if (err) {
                console.log(`[Economy-X] player_data.json Error! \n${err}`);
            } else {
                console.log(`[Economy-X] player_data.json Success!`);
            }
        });
    }
}

events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});

events.serverStop.on(() => {
    EconomyX.writeConfig();
    EconomyX.writeData();
});


/**NEW EconomyWeb. */
export class EconomyWeb {
    /**Check player data. */
    static check(xuid: string): boolean {
        return db.hasOwnProperty(xuid);
    }

    /**Get player data. */
    static getPlayer(xuid: string): player_data|null {
        if (db.hasOwnProperty(xuid) === false) return null;
        return db[xuid];
    }

    /**Add player money. */
    static addMoney(xuid: string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 1) return ecoR.Invalid;

        data.money=data.money+amount;
        return ecoR.Success;
    }

    /**Remove player money. */
    static removeMoney(xuid:string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 1) return ecoR.Invalid;
        if (data.money-amount < 0) {
            data.money=0;
            return ecoR.Success;
        }

        data.money=data.money-amount;
        return ecoR.Success;
    }

    /**Set player money. */
    static setMoney(xuid: string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 0) return ecoR.Invalid;

        data.money=amount;
        return ecoR.Success;
    }

    /**Get player money. */
    static getMoney(xuid: string): number|null {
        if (db.hasOwnProperty(xuid) === false) return null;

        const data = db[xuid];

        return data.money;
    }
}

export class XCoin {
    /**Get player X-Coin. */
    static get(player: ServerPlayer): number {
        if (player.getXuid() === undefined) return 0;
        if (db.hasOwnProperty(player.getXuid()) === false) EconomyX.addPlayer(player);

        const data = db[player.getXuid()];
        return data.xcoin;
    }

    /**Add player X-Coin. */
    static add(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) EconomyX.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 1) return ecoR.Invalid;

        data.xcoin=data.xcoin+amount;
        return ecoR.Success;
    }

    /**Remove player X-Coin. */
    static remove(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) EconomyX.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 1) return ecoR.Invalid;
        if (data.xcoin-amount < 0) {
            data.xcoin=0;
            return ecoR.Success;
        }

        data.xcoin=data.xcoin-amount;
        return ecoR.Success;
    }

    /**Set player X-Coin. */
    static set(player: ServerPlayer, amount: number): ecoR {
        if (player.getXuid() === undefined) return ecoR.NotFound;
        if (db.hasOwnProperty(player.getXuid()) === false) EconomyX.addPlayer(player);

        const data = db[player.getXuid()];

        if (amount < 0) return ecoR.Invalid;

        data.xcoin=amount;
        return ecoR.Success;
    }
}

export class XCoinWeb {
    /**Get player X-Coin. */
    static get(xuid: string): number {
        if (db.hasOwnProperty(xuid) === false) return 0;

        const data = db[xuid];
        return data.xcoin;
    }

    /**Add player X-Coin. */
    static add(xuid: string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 1) return ecoR.Invalid;

        data.xcoin=data.xcoin+amount;
        return ecoR.Success;
    }

    /**Remove player X-Coin. */
    static remove(xuid: string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 1) return ecoR.Invalid;
        if (data.xcoin-amount < 0) {
            data.xcoin=0;
            return ecoR.Success;
        }

        data.xcoin=data.xcoin-amount;
        return ecoR.Success;
    }

    /**Set player X-Coin. */
    static set(xuid: string, amount: number): ecoR {
        if (db.hasOwnProperty(xuid) === false) return ecoR.NotFound;

        const data = db[xuid];

        if (amount < 0) return ecoR.Invalid;

        data.xcoin=amount;
        return ecoR.Success;
    }
}

export function sendTransslate(player: ServerPlayer, message: string): void {
    const pk = TextPacket.allocate();
    pk.type = TextPacket.Types.Raw;
    pk.message = translate(message);
    player.sendNetworkPacket(pk);
    pk.dispose();
}