import { Player } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { send } from "./src/utils/message";
import * as path from "path";
import * as fs from "fs";

export interface PlayerEconomy {
    xuid: string;
    money: number;
    xcoin: number;
}

let config: {
    currency: string;
} = {
    currency: "$",
};
let economy: PlayerEconomy[] = [];

const configPath = path.join(__dirname, "config.json");
const economyPath = path.join(__dirname, "economy.json");

try {
    config = require(configPath);
    economy = require(economyPath);
} catch(err) {}

/**Economy-X */
export namespace EconomyX {
    /**Get economy currency */
    export function currency(): string {
        return config.currency;
    }

    /**Set economy currency */
    export function setCurrency(currency: string) {
        return config.currency=currency;
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
    export function addMoney(player: Player, amount: number): number|null {
        if (player.getXuid() === "") return null;

        let result: number|null = null;
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
    export function removeMoney(player: Player, amount: number): number|null {
        if (player.getXuid() === "") return null;

        let result: number|null = null;
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
    export function setMoney(player: Player, amount: number): number|null {
        if (player.getXuid() === "") return null;

        let result: number|null = null;
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
        export function add(player: Player, amount: number): number|null {
            if (player.getXuid() === "") return null;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return add(player, amount);
            }

            let result: number|null = null;
            data.addXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }

        /**Remove player X-Coin */
        export function remove(player: Player, amount: number): number|null {
            if (player.getXuid() === "") return null;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return remove(player, amount);
            }

            let result: number|null = null;
            data.removeXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }

        /**Set player X-Coin */
        export function set(player: Player, amount: number): number|null {
            if (player.getXuid() === "") return null;

            const data = PlayerEconomy.getPlayer(player);
            if (!data) {
                addPlayer(player);
                return set(player, amount);
            }

            let result: number|null = null;
            data.setXCoin(amount)
            .then((v) => {
                result=v;
            });

            return result;
        }
    }

    /**Save */
    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 4), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
        fs.writeFile(economyPath, JSON.stringify(economy, null, 4), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`economy.json ${err}`);
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
    async setMoney(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0) {
                reject("Invalid value!");
                return;
            }

            economy[index].money=amount;
            resolve(economy[index].money);
        });
    }

    /**Add player money */
    async addMoney(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0||amount === 0) {
                reject("Invalid value!");
                return;
            }

            economy[index].money+=amount;
            resolve(economy[index].money);
        });
    }

    /**Remove player money */
    async removeMoney(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0||amount === 0) {
                reject("Invalid value!");
                return;
            }
            if ((this.money - amount) < 0) {
                reject(`Invalid amount!`);
                return;
            }

            economy[index].money-=amount;
            resolve(economy[index].money);
        });
    }

    /**Set player money */
    async setXCoin(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0) {
                reject("Invalid value!");
                return;
            }

            economy[index].xcoin=amount;
            resolve(economy[index].xcoin);
        });
    }

    /**Add player money */
    async addXCoin(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0||amount === 0) {
                reject("Invalid value!");
                return;
            }

            economy[index].xcoin+=amount;
            resolve(economy[index].xcoin);
        });
    }

    /**Remove player money */
    async removeXCoin(amount: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = -1;
            economy.findIndex((v, i) => {
                if (v.xuid === this.xuid) index=i;
            });

            if (index < 0) {
                reject("Player data not found!");
                return;
            }
            if (amount < 0||amount === 0) {
                reject("Invalid value!");
                return;
            }
            if ((this.xcoin - amount) < 0) {
                reject(`Invalid amount!`);
                return;
            }

            economy[index].xcoin-=amount;
            resolve(economy[index].xcoin);
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
}

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});

events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});

events.serverClose.on(() => {
    EconomyX.save(true);
});

