"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const translate_1 = require("./utils/translate");
const __1 = require("..");
command_2.command.register("mymoney", translate_1.send.text("command.mymoney.d"))
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    pl.sendMessage(translate_1.send.text("command.mymoney.r").replace("%money%", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl)}`));
}, {});
command_2.command.register("money", translate_1.send.text("command.money.d"))
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                pl.sendMessage(translate_1.send.text("command.mymoney.r").replace("%money%", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl)}`));
            }
            else {
                pl.sendMessage(translate_1.send.text("command.money.r").replace("%player%", tr.getName()).replace("%money%", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(tr)}`));
            }
        }
    }
}, {
    target: command_1.PlayerCommandSelector
});
command_2.command.register("transfer", translate_1.send.text("command.transfer.d"))
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                pl.sendMessage(translate_1.send.text("transfer.sameplayer"));
            }
            else {
                if (p.money < 1) {
                    pl.sendMessage(translate_1.send.text("number.invalid"));
                    return;
                }
                if (__1.EconomyX.getPlayer(pl) === null) {
                    pl.sendMessage(translate_1.send.text("transfer.player.xuidnotfound"));
                    return;
                }
                if (__1.EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage(translate_1.send.text("transfer.target.xuidnotfound"));
                    return;
                }
                if (__1.EconomyX.getMoney(pl) - p.money < 0) {
                    pl.sendMessage(translate_1.send.text("transfer.player.success").replace("%money%", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl)}`).replace("%player%", tr.getName()));
                    tr.sendMessage(translate_1.send.text("transfer.target.success").replace("%money%", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl)}`).replace("%player%", pl.getName()));
                    __1.EconomyX.transfer(pl, tr, p.money);
                    return;
                }
                pl.sendMessage(translate_1.send.text("transfer.player.success").replace("%money%", `${__1.EconomyX.currency()}${p.money}`).replace("%player%", tr.getName()));
                tr.sendMessage(translate_1.send.text("transfer.target.success").replace("%money%", `${__1.EconomyX.currency()}${p.money}`).replace("%player%", pl.getName()));
                __1.EconomyX.transfer(pl, tr, p.money);
            }
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("addmoney", translate_1.send.text("command.addmoney.d"), command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 1) {
                pl.sendMessage(translate_1.send.text("number.invalid"));
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                pl.sendMessage(translate_1.send.text("xuid.notfound"));
                return;
            }
            __1.EconomyX.addMoney(tr, p.money);
            pl.sendMessage(translate_1.send.text("command.addmoney.r").replace("%player%", tr.getName()).replace("%money%", `${__1.EconomyX.currency()}${p.money}`));
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("removemoney", translate_1.send.text("command.removemoney.d"), command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 1) {
                pl.sendMessage(translate_1.send.text("number.invalid"));
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                pl.sendMessage(translate_1.send.text("xuid.notfound"));
                return;
            }
            __1.EconomyX.removeMoney(tr, p.money);
            pl.sendMessage(translate_1.send.text("command.removemoney.r").replace("%player%", tr.getName()).replace("%money%", `${__1.EconomyX.currency()}${p.money}`));
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("setmoney", translate_1.send.text("command.setmoney.d"), command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 0) {
                pl.sendMessage(translate_1.send.text("number.invalid"));
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                pl.sendMessage(translate_1.send.text("xuid.notfound"));
                return;
            }
            __1.EconomyX.setMoney(tr, p.money);
            pl.sendMessage(translate_1.send.text("command.setmoney.r").replace("%player%", tr.getName()).replace("%money%", `${__1.EconomyX.currency()}${p.money}`));
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBaUY7QUFDakYsMENBQXVDO0FBQ3ZDLGdEQUEwQztBQUMxQyxpREFBeUM7QUFDekMsMEJBQThCO0FBRTlCLGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxnQkFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQzFELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1FBQUUsT0FBTztJQUV4QixFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLFlBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxZQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVQLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3RELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVB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