import * as path from "path";
import * as fs from "fs";
import { events } from "bdsx/event";
import { send } from "..";

let config: {
    currency: string;
    lang: string;
} = {
    currency: "$",
    lang: "EN_us",
};

const configPath = path.join(__dirname, "..", "config.json");

try {
    config = require(configPath)
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
    export function getLang(): string {
        return config.lang;
    }
}

events.serverClose.on(() => {
    fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
        if (err) {
            send.error(`config.json Error! ${err}`);
            throw err;
        }
        else send.success(`config.json Saved!`);
    });
})