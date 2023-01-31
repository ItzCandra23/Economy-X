import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { EconomyConfig } from ".";
import { send } from "..";
import * as path from "path";
import * as fs from "fs";

interface player_data {
    money: number;
    xcoin: number;
}

let economy: Record<string, player_data> = {};

const economyPath = path.join(__dirname, "..", "economy.json");

try {
    economy = require(economyPath);
} catch(err) {
    if (err) {
        send.error(`economy.json Error! ${err}`);
        throw err;
    }
}

/**Economy-X. */
export namespace EconomyX {
    /**Get currency. */
    export function currency(): string {
        return EconomyConfig.getCurrency();
    }

    /**Add player data. */
    export function addPlayer(player: ServerPlayer): boolean {
        if (player.getXuid() === "") return false;
        if (economy.hasOwnProperty(player.getXuid())) return false;

        economy[player.getXuid()] = {
            money: 0,
            xcoin: 0,
        };
        return true;
    }

    /**Get player data. */
    export function getPlayer(player: ServerPlayer): player_data|null {
        if (!economy.hasOwnProperty(player.getXuid())) return null;

        return economy[player.getXuid()];
    }

    /**Add player money. */
    export function addMoney(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) addPlayer(player);
        if (amount < 0||amount === 0) return false;

        let data = economy[player.getXuid()];

        data.money=data.money+amount;
        return true;
    }

    /**Remove player money. */
    export function removeMoney(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) addPlayer(player);
        if (amount < 0||amount === 0) return false;

        let data = economy[player.getXuid()];

        if (data.money-amount < 0) {
            data.money=0;
            return true;
        }

        data.money=data.money-amount;
        return true;
    }

    /**Set player money. */
    export function setMoney(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (economy.hasOwnProperty(player.getXuid()) === false) addPlayer(player);
        if (amount < 0) return false;

        let data = economy[player.getXuid()];

        data.money=amount;
        return true;
    }

    /**Get player money. */
    export function getMoney(player: ServerPlayer): number {
        if (player.getXuid() === undefined) return -1;
        if (economy.hasOwnProperty(player.getXuid()) === false) addPlayer(player);

        let data = economy[player.getXuid()];

        return data.money;
    }

    /**Transfer money player to target. */
    export function transfer(player: ServerPlayer, target: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (target.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) addPlayer(player);
        if (!economy.hasOwnProperty(target.getXuid())) addPlayer(target);


        let data1 = economy[player.getXuid()];
        let data2 = economy[target.getXuid()];

        if (amount < 0||amount === 0) return false;
        if (data1.money-amount < 0) {
            data2.money+=data1.money;
            data1.money=0;
            return false;
        }

        data1.money-=amount;
        data2.money+=amount;
        return true;
    }

    /**Save. */
    export function save(message: boolean = false): void {
        fs.writeFile(economyPath, JSON.stringify(economy, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`economy.json Error! ${err}`);
                    throw err;
                }
                else send.success(`economy.json Saved!`);
            }
        });
    }
}


export namespace EconomyWeb {
    /**Check player data. */
    export function check(xuid: string): boolean {
        return economy.hasOwnProperty(xuid);
    }

    /**Get player data. */
    export function getPlayer(xuid: string): player_data|null {
        if (!economy.hasOwnProperty(xuid)) return null;
        return economy[xuid];
    }

    /**Add player money. */
    export function addMoney(xuid: string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0||amount === 0) false;

        let data = economy[xuid];

        data.money+=amount;
        return true;
    }

    /**Remove player money. */
    export function removeMoney(xuid:string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0||amount === 0) return false;

        let data = economy[xuid];

        if (data.money-amount < 0) {
            data.money=0;
            return true;
        }

        data.money-=amount;
        return true;
    }

    /**Set player money. */
    export function setMoney(xuid: string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0) return false;

        let data = economy[xuid];

        data.money=amount;
        return true;
    }

    /**Get player money. */
    export function getMoney(xuid: string): number {
        if (!economy.hasOwnProperty(xuid)) return -1;

        let data = economy[xuid];

        return data.money;
    }
}

export namespace XCoin {
    /**Get player X-Coin. */
    export function get(player: ServerPlayer): number {
        if (player.getXuid() === "") return -1;
        if (!economy.hasOwnProperty(player.getXuid())) EconomyX.addPlayer(player);

        let data = economy[player.getXuid()];
        return data.xcoin;
    }

    /**Add player X-Coin. */
    export function add(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) EconomyX.addPlayer(player);
        if (amount < 0||amount === 0) return false;

        let data = economy[player.getXuid()];

        data.xcoin+=amount;
        return true;
    }

    /**Remove player X-Coin. */
    export function remove(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) EconomyX.addPlayer(player);
        if (amount < 0||amount === 0) return false;

        let data = economy[player.getXuid()];

        if (data.xcoin-amount < 0) {
            data.xcoin=0;
            return true;
        }

        data.xcoin-=amount;
        return true;
    }

    /**Set player X-Coin. */
    export function set(player: ServerPlayer, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (!economy.hasOwnProperty(player.getXuid())) EconomyX.addPlayer(player);
        if (amount < 0) return false;

        let data = economy[player.getXuid()];

        data.xcoin=amount;
        return true;
    }
}

export namespace XCoinWeb {
    /**Get player X-Coin. */
    export function get(xuid: string): number {
        if (!economy.hasOwnProperty(xuid)) return -1;

        const data = economy[xuid];
        return data.xcoin;
    }

    /**Add player X-Coin. */
    export function add(xuid: string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0||amount === 0) return false;

        let data = economy[xuid];

        data.xcoin+=amount;
        return true;
    }

    /**Remove player X-Coin. */
    export function remove(xuid: string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0||amount === 0) return false;

        let data = economy[xuid];

        if (data.xcoin-amount < 0) {
            data.xcoin=0;
            return true;
        }

        data.xcoin-=amount;
        return true;
    }

    /**Set player X-Coin. */
    export function set(xuid: string, amount: number): boolean {
        if (!economy.hasOwnProperty(xuid)) return false;
        if (amount < 0) return false;

        let data = economy[xuid];

        data.xcoin=amount;
        return true;
    }
}

events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
events.serverStop.on(() => EconomyX.save());