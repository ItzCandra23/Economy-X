"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const name = "EconomyX";
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
    return text.split("§").map((v, i) => { if (i === 0)
        return v;
    else
        return v.slice(1); }).join().replace(/,/g, "");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBRXhCLHdDQUF3QztBQUN4QyxNQUFhLElBQUk7SUFFYixZQUFZLEtBQWM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBNkM7UUFDdkYsSUFBSSxPQUFPO1lBQUUsT0FBTyxHQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLO1lBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7O1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFlBQVksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBNkM7UUFDekYsSUFBSSxPQUFPO1lBQUUsT0FBTyxHQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLO1lBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7O1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBNkM7UUFDckYsSUFBSSxPQUFPO1lBQUUsT0FBTyxH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