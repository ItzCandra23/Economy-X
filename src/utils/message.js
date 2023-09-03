"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTranslate = exports.send = void 0;
const lang_1 = require("./lang");
const __1 = require("..");
const name = "Economy-X";
const lang = new lang_1.Language(__1.EconomyConfig.getLanguage());
/**Send message to player or console. */
class send {
    constructor(actor) {
        this.actor = actor;
    }
    /**Send error message. */
    static error(message, actor, replace) {
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(`§c${message}`);
        else
            console.log(`[${name}] Error! ${textFilter(message)}`.red);
    }
    /**Send success message. */
    static success(message, actor, replace) {
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(`§a${message}`);
        else
            console.log(`[${name}] ${textFilter(message)}`.green);
    }
    /**Send normal message. */
    static msg(message, actor, replace) {
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(message);
        else
            console.log(`[${name}] ${textFilter(message)}`);
    }
    /**Translate text. */
    static translate(text) {
        return lang.translate(text).slice(0, -1);
    }
    /**Send error message. */
    error(message, replace) {
        if (this.actor)
            send.error(message, this.actor, replace);
        else
            send.error(message);
    }
    /**Send success message. */
    success(message, replace) {
        if (this.actor)
            send.success(message, this.actor, replace);
        else
            send.success(message);
    }
    /**Send normal message. */
    msg(message, replace) {
        if (this.actor)
            send.msg(message, this.actor, replace);
        else
            send.msg(message);
    }
}
exports.send = send;
/**Send translate message to player or console. */
class sendTranslate {
    constructor(actor) {
        this.actor = actor;
    }
    /**Send error message. */
    static error(message, actor, replace) {
        message = this.translate(message);
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(`§c${message}`);
        else
            console.log(`[${name}] Error! ${textFilter(message)}`.red);
    }
    /**Send success message. */
    static success(message, actor, replace) {
        message = this.translate(message);
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(`§a${message}`);
        else
            console.log(`[${name}] ${textFilter(message)}`.green);
    }
    /**Send normal message. */
    static msg(message, actor, replace) {
        message = this.translate(message);
        if (replace)
            message = textReplace(message, replace);
        if (actor)
            actor.sendMessage(message);
        else
            console.log(`[${name}] ${textFilter(message)}`);
    }
    /**Translate text. */
    static translate(text) {
        return lang.translate(text).slice(0, -1);
    }
    /**Send error message. */
    error(message, replace) {
        if (this.actor)
            sendTranslate.error(message, this.actor, replace);
        else
            sendTranslate.error(message);
    }
    /**Send success message. */
    success(message, replace) {
        if (this.actor)
            sendTranslate.success(message, this.actor, replace);
        else
            sendTranslate.success(message);
    }
    /**Send normal message. */
    msg(message, replace) {
        if (this.actor)
            sendTranslate.msg(message, this.actor, replace);
        else
            sendTranslate.msg(message);
    }
}
exports.sendTranslate = sendTranslate;
function isArrayOfTuples(obj) {
    return Array.isArray(obj) && obj.every(item => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'string');
}
function textReplace(text, replace) {
    if (isArrayOfTuples(replace)) {
        replace.forEach(([v, w]) => {
            const reg = new RegExp(v, "g");
            text = text.replace(reg, w);
        });
    }
    else {
        const reg = new RegExp(replace[0], "g");
        text = text.replace(reg, replace[1]);
    }
    return text;
}
function textFilter(text) {
    return text.split("§").map((v) => v.slice(1)).join().replace(/,/g, "");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQWtDO0FBQ2xDLDBCQUFtQztBQUVuQyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFRLENBQUMsaUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBRXZELHdDQUF3QztBQUN4QyxNQUFhLElBQUk7SUFFYixZQUFZLEtBQWM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBNkM7UUFDdkYsSUFBSSxPQUFPO1lBQUUsT0FBTyxHQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLO1lBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7O1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFlBQVksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBNkM7UUFDekYsSUFBSSxPQUFPO1lBQUUsT0FBTyxHQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLO1lBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7O1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FB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