import { Player } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { EconomyConfig } from "./src";
import { send } from "./src/utils/message";
import * as path from "path";
import * as fs from "fs";

export interface PlayerEconomy {
    xuid: string;
    money: number;
    xcoin: number;
}

let economy: PlayerEconomy[] = [];

const economyPath = path.join(__dirname, "economy.json");

try {
    economy = require(economyPath);
} catch(err) {}

/**Economy-X */
export namespace EconomyX {
    /**Get economy currency */
    export function currency(): string {
        return EconomyConfig.getCurrency();
    }

    /**Set economy currency */
    export function setCurrency(currency: string) {
        return EconomyConfig.setCurrency(currency);
    }

    /**Add player economy */
    export function addPlayer(player: Player): boolean {
        if (player.getXuid() === "") return false;

        const data = {
            xuid: player.getXuid(),
            money: 0,
            xcoin: 0,
        } as PlayerEconomy;

        return PlayerEconomy.addPlayer(data);
    }

    /**Get player economy */
    export function getPlayer(player: Player): PlayerEconomy|undefined {
        return PlayerEconomy.getPlayer(player);
    }

    /**Get player economy */
    export function getPlayerByXuid(xuid: string): PlayerEconomy|undefined {
        return PlayerEconomy.getPlayerByXuid(xuid);
    }

    /**Add player money */
    export function addMoney(player: Player, amount: number): boolean {
        if (player.getXuid() === "") return false;

        let result = false;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return addMoney(player, amount);
        }

        data.addMoney(amount)
        .then((v) => {
            result=v;
        });

        return result;
    }

    /**Remove player money */
    export function removeMoney(player: Player, amount: number): boolean {
        if (player.getXuid() === "") return false;

        let result = false;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return removeMoney(player, amount);
        }

        data.removeMoney(amount)
        .then((v) => {
            result=v;
        });

        return result;
    }

    /**Set player money */
    export function setMoney(player: Player, amount: number): boolean {
        if (player.getXuid() === "") return false;

        let result = false;
        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return setMoney(player, amount);
        }

        data.setMoney(amount)
        .then((v) => {
            result=v;
        });

        return result;
    }

    /**Get player money */
    export function getMoney(player: Player): number {
        if (player.getXuid() === undefined) return -1;

        const data = PlayerEconomy.getPlayer(player);
        if (!data) {
            addPlayer(player);
            return getMoney(player);
        }

        return data.getMoney();
    }

    /**Transfer money player to target */
    export function transfer(player: Player, target: Player, amount: number): boolean {
        if (player.getXuid() === "") return false;
        if (target.getXuid() === "") return false;


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

        if (amount < 0||amount === 0) return false;
        if ((data1.money-amount) < 0) {
            data2.addMoney(data1.getMoney());
            data1.setMoney(0);
            return false;
        }

        data1.removeMoney(amount);
        data2.addMoney(amount);
        return true;
    }

    export namespace XCoin {

        /**Get player X-Coin */
        export function get(player: Player): number {
            if (player.getXuid() === "") return 0;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return get(player);
            }
            return data.xcoin;
        }

        /**Add player X-Coin */
        export function add(player: Player, amount: number): boolean {
            if (player.getXuid() === "") return false;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return add(player, amount);
            }

            let result = false;
            data.addXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }

        /**Remove player X-Coin */
        export function remove(player: Player, amount: number): boolean {
            if (player.getXuid() === "") return false;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return remove(player, amount);
            }

            let result = false;
            data.removeXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }

        /**Set player X-Coin */
        export function set(player: Player, amount: number): boolean {
            if (player.getXuid() === "") return false;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return set(player, amount);
            }

            let result = false;
            data.setXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }
    }

    /**Save */
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

/**Player Economy */
export class PlayerEconomy {
    constructor(public xuid: string, public money: number, public xcoin: number) {}

    /**Add new player economy */
    static addPlayer(player: PlayerEconomy): boolean {
        if (this.getPlayerByXuid(player.xuid)) return false;

        economy.push(player);
        return true;
    }

    /**Get player economy */
    static getPlayer(player: Player): PlayerEconomy|undefined {
        const data = economy.find(data => data.xuid === player.getXuid());

        if (!data) return undefined;
        else return new PlayerEconomy(data.xuid, data.money, data.xcoin);
    }

    /**Get player economy by xuid */
    static getPlayerByXuid(xuid: string): PlayerEconomy|undefined {
        const data = economy.find(data => data.xuid === xuid);

        if (!data) return undefined;
        else return new PlayerEconomy(data.xuid, data.money, data.xcoin);
    }

    /**Set player money */
    async setMoney(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0) {
                reject("Error: Invalid value!");
                return;
            }

            this.money=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Add player money */
    async addMoney(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0||amount === 0) {
                reject("Error: Invalid value!");
                return;
            }

            this.money+=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Remove player money */
    async removeMoney(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0||amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            if ((this.money - amount) < 0) {
                reject(`Error: Invalid amount!`);
                return;
            }

            this.money-=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Set player money */
    async setXCoin(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0) {
                reject("Error: Invalid value!");
                return;
            }

            this.xcoin=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Add player money */
    async addXCoin(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0||amount === 0) {
                reject("Error: Invalid value!");
                return;
            }

            this.xcoin+=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Remove player money */
    async removeXCoin(amount: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (amount < 0||amount === 0) {
                reject("Error: Invalid value!");
                return;
            }
            if ((this.xcoin - amount) < 0) {
                reject(`Error: Invalid amount!`);
                return;
            }

            this.xcoin-=amount;
            this.update()
            .catch((reason) => {
                if (reason) reject(reason);
            });
            resolve(true);
        });
    }

    /**Get player money */
    getMoney(): number {
        return this.money;
    }

    /**Get player x-coin */
    getXCoin(): number {
        return this.xcoin;
    }

    /**Update */
    async update(): Promise<void> {
        return new Promise((resolve, reject) => {
            let index = -1;
            index = economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) return i;
            });

            if (index < 0) {
                reject("Error: Player data not found!");
                return;
            }

            economy[index]=this;
            resolve();
        });
    }
}

events.serverOpen.on(() => {
    require("./src");
    require("./src/command");
    send.success("Started!");
});

events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});

events.serverClose.on(() => {
    EconomyConfig.save(true);
    EconomyX.save(true);
});

