"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTranslate = exports.send = void 0;
const __1 = require("..");
const lang_1 = require("./lang");
const name = "EconomyX";
/**Send translate message to player or console. */
var send;
(function (send) {
    const lang = new lang_1.Language(__1.EconomyConfig.getLanguage());
    /**Send error message. */
    function error(message, actor) {
        if (actor)
            actor.sendMessage(`§c${text(message)}`);
        else
            console.log(`[${name}] Error! ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.red);
    }
    send.error = error;
    /**Send success message. */
    function success(message, actor) {
        if (actor)
            actor.sendMessage(`§a${text(message)}`);
        else
            console.log(`[${name}] ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.green);
    }
    send.success = success;
    /**Send normal message. */
    function msg(message, actor) {
        if (actor)
            actor.sendMessage(text(message));
        else
            console.log(`[${name}] ${text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`);
    }
    send.msg = msg;
    /**Translate text. */
    function text(text) {
        return lang.translate(text).slice(0, -1);
    }
    send.text = text;
})(send || (exports.send = send = {}));
/**Send message to player or console. */
class sendTranslate {
    constructor(actor, message = true) {
        this.actor = actor;
        this.message = message;
    }
    isMessage() {
        return this.message;
    }
    ;
    /**Send error message. */
    error(message) {
        if (this.message) {
            if (this.actor)
                this.actor.sendMessage(`§c${send.text(message)}`);
            else
                console.log(`[${name}] Error! ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.red);
        }
    }
    /**Send success message. */
    success(message) {
        if (this.message) {
            if (this.actor)
                this.actor.sendMessage(`§a${send.text(message)}`);
            else
                console.log(`[${name}] ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`.green);
        }
    }
    /**Send normal message. */
    msg(message) {
        if (this.message) {
            if (this.actor)
                this.actor.sendMessage(send.text(message));
            else
                console.log(`[${name}] ${send.text(message).replace(/§r/g, "").replace(/§c/g, "").replace(/§a/g, "").replace(/§e/g, "").replace(/§f/g, "").replace(/§8/g, "").replace(/§7/g, "")}`);
        }
    }
}
exports.sendTranslate = sendTranslate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBCQUFtQztBQUNuQyxpQ0FBa0M7QUFFbEMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBRXhCLGtEQUFrRDtBQUNsRCxJQUFpQixJQUFJLENBd0JwQjtBQXhCRCxXQUFpQixJQUFJO0lBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBUSxDQUFDLGlCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCx5QkFBeUI7SUFDekIsU0FBZ0IsS0FBSyxDQUFDLE9BQWUsRUFBRSxLQUFvQjtRQUN2RCxJQUFJLEtBQUs7WUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25NLENBQUM7SUFIZSxVQUFLLFFBR3BCLENBQUE7SUFFRCwyQkFBMkI7SUFDM0IsU0FBZ0IsT0FBTyxDQUFDLE9BQWUsRUFBRSxLQUFvQjtRQUN6RCxJQUFJLEtBQUs7WUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENB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