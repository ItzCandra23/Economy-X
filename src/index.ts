import * as path from "path";
import * as fs from "fs";
import { Player } from "bdsx/bds/player";

let config: {
    currency: string;
    language: string;
} = {
    currency: "$",
    language: "EN_us",
};

const configPath = path.join(__dirname, "..", "config.json");

try {
    config = require(configPath);
} catch(err) {}

export namespace EconomyConfig {

    export function setCurrency(currency: string): boolean {
        if (currency.includes(" ")) return false;
        if (currency === "") return false;

        config.currency=currency;
        return true;
    }

    export function getCurrency(): string {
        return config.currency;
    }

    export function getLanguage(): string {
        return config.language ?? "EN_us";
    }

    export function save(message: boolean = false, actor?: Player): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    console.log(`[Economy-X] Error! config.json Error! ${err}`.red);
                    throw err;
                }
                else console.log(`[Economy-X] config.json Saved!`.green);
            }
        });
    }
}