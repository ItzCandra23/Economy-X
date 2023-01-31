import { events } from "bdsx/event";
import { ServerPlayer } from "bdsx/bds/player";
import { Language } from "./src/util/lang";
import { Configuration } from "./src/util/configuration";
import { EconomyConfig } from "./src";

const configuration = new Configuration(EconomyConfig.getLang());
const language = new Language(configuration.language);

/**Send translate message to player or console. */
export namespace send {

    /**Translate text. */
    export function translate(text: string): string {
        const translate = language.translate(text);
        if (!translate) return text;
        return translate.substring(0, text.length-1);
    }

    /**Send error message. */
    export function error(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(translate(`§c${message.replace(/&e/g, "§e").replace(/&7/g, "§7").replace(/&r/g, "§r§c").replace(/&/g, "§")}`));
        else console.log(translate(`[Economy-X] Error! ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`));
    }

    /**Send error message. */
    export function success(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(translate(`§a${message.replace(/&e/g, "§e").replace(/&7/g, "§7").replace(/&r/g, "§r§a").replace(/&/g, "§")}`));
        else console.log(translate(`[Economy-X] ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`));
    }

    /**Send error message. */
    export function msg(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(translate(`${message.replace(/&/g, "§")}`));
        else console.log(translate(`[Economy-X] ${message.replace(/&e/g, "").replace(/&7/g, "").replace(/&r/g, "").replace(/&/g, "")}`));
    }
}

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});
