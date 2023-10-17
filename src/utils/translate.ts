import { ServerPlayer } from "bdsx/bds/player";
import { EconomyConfig } from "..";
import { Language } from "./lang";

const name = "EconomyX";

/**Send translate message to player or console. */
export namespace send {
    const lang = new Language(EconomyConfig.getLanguage());
    /**Send error message. */
    export function error(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(`§c${text(message)}`);
        else console.log(`[${name}] Error! ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.red);
    }

    /**Send success message. */
    export function success(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(`§a${text(message)}`);
        else console.log(`[${name}] ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.green);
    }

    /**Send normal message. */
    export function msg(message: string, actor?: ServerPlayer): void {
        if (actor) actor.sendMessage(text(message));
        else console.log(`[${name}] ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`);
    }

    /**Translate text. */
    export function text(text: string): string {
        return lang.translate(text).slice(0, -1);
    }
}

/**Send message to player or console. */
export class sendTranslate {
    private message: boolean;
    private actor?: ServerPlayer;
    constructor(actor?: ServerPlayer, message: boolean = true) {
        this.actor=actor;
        this.message=message;
    }

    isMessage(): boolean {
        return this.message;
    };

    /**Send error message. */
    error(message: string): void {
        if (this.message) {
            if (this.actor) this.actor.sendMessage(`§c${send.text(message)}`);
            else console.log(`[${name}] Error! ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.red);
        }
    }

    /**Send success message. */
    success(message: string): void {
        if (this.message) {
            if (this.actor) this.actor.sendMessage(`§a${send.text(message)}`);
            else console.log(`[${name}] ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.green);
        }
    }

    /**Send normal message. */
    msg(message: string): void {
        if (this.message) {
            if (this.actor) this.actor.sendMessage(send.text(message));
            else console.log(`[${name}] ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`);
        }
    }
}
