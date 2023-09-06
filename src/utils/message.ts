import { Player } from "bdsx/bds/player";

const name = "EconomyX";

/**Send message to player or console. */
export class send {
    private actor?: Player;
    constructor(actor?: Player) {
        this.actor=actor;
    }

    /**Send error message. */
    static error(message: string, actor?: Player, replace?: [string, string]|[string, string][]): void {
        if (replace) message=textReplace(message, replace);
        if (actor) actor.sendMessage(`§c${message}`);
        else console.log(`[${name}] Error! ${textFilter(message)}`.red);
    }

    /**Send success message. */
    static success(message: string, actor?: Player, replace?: [string, string]|[string, string][]): void {
        if (replace) message=textReplace(message, replace);
        if (actor) actor.sendMessage(`§a${message}`);
        else console.log(`[${name}] ${textFilter(message)}`.green);
    }

    /**Send normal message. */
    static msg(message: string, actor?: Player, replace?: [string, string]|[string, string][]): void {
        if (replace) message=textReplace(message, replace);
        if (actor) actor.sendMessage(message);
        else console.log(`[${name}] ${textFilter(message)}`);
    }

    /**Send error message. */
    error(message: string, replace?: [string, string]|[string, string][]): void {
        if (this.actor) send.error(message, this.actor, replace);
        else send.error(message);
    }

    /**Send success message. */
    success(message: string, replace?: [string, string]|[string, string][]): void {
        if (this.actor) send.success(message, this.actor, replace);
        else send.success(message);
    }

    /**Send normal message. */
    msg(message: string, replace?: [string, string]|[string, string][]): void {
        if (this.actor) send.msg(message, this.actor, replace);
        else send.msg(message);
    }
}

function isArrayOfTuples(obj: any): obj is [string, string][] {
    return Array.isArray(obj) && obj.every(item => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'string');
}

function textReplace(text: string, replace: [string, string]|[string, string][]): string {
    if (isArrayOfTuples(replace)) {
        replace.forEach(([v, w]) => {
            const reg = new RegExp(v, "g");
            text=text.replace(reg, w);
        });
    }
    else {
        const reg = new RegExp(replace[0], "g");
        text=text.replace(reg, replace[1]);
    }

    return text;
}

function textFilter(text: string): string {
    return text.split("§").map((v, i) => { if (i === 0) return v; else return v.slice(1)}).join().replace(/,/g, "");
}