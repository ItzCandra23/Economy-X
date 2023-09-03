"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const __1 = require("..");
const message_1 = require("./utils/message");
command_2.command.register("mymoney", message_1.send.translate("command.mymoney.d"))
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    message_1.sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});
command_2.command.register("money", message_1.send.translate("command.money.d"))
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
                message_1.sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
            }
            else {
                message_1.sendTranslate.msg("command.money.r", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(tr).toLocaleString()}`]]);
            }
        }
    }
}, {
    target: command_1.PlayerCommandSelector
})
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    message_1.sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});
command_2.command.register("transfer", message_1.send.translate("command.transfer.d"))
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
                message_1.sendTranslate.error("transfer.sameplayer", pl);
            }
            else {
                if (p.money < 1) {
                    message_1.sendTranslate.error("number.invalid", pl);
                    return;
                }
                if (__1.EconomyX.getPlayer(pl) === null) {
                    message_1.sendTranslate.error("transfer.player.xuidnotfound", pl);
                    return;
                }
                if (__1.EconomyX.getPlayer(tr) === null) {
                    message_1.sendTranslate.error("transfer.target.xuidnotfound", pl);
                    return;
                }
                if (__1.EconomyX.getMoney(pl) - p.money < 0) {
                    message_1.sendTranslate.msg("transfer.player.success", pl, [["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", tr.getName()]]);
                    message_1.sendTranslate.msg("transfer.target.success", pl, [["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", pl.getName()]]);
                    __1.EconomyX.transfer(pl, tr, p.money);
                    return;
                }
                message_1.sendTranslate.msg("transfer.player.success", pl, [["{money}", `${__1.EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", tr.getName()]]);
                message_1.sendTranslate.msg("transfer.target.success", pl, [["{money}", `${__1.EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", pl.getName()]]);
                __1.EconomyX.transfer(pl, tr, p.money);
            }
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("addmoney", message_1.send.translate("command.addmoney.d"), command_1.CommandPermissionLevel.Operator)
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
                message_1.sendTranslate.error("number.invalid", pl);
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                message_1.sendTranslate.error("xuid.notfound", pl);
                return;
            }
            __1.EconomyX.addMoney(tr, p.money);
            message_1.sendTranslate.success("command.addmoney.r", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("removemoney", message_1.send.translate("command.removemoney.d"), command_1.CommandPermissionLevel.Operator)
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
                message_1.sendTranslate.error("number.invalid", pl);
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                message_1.sendTranslate.error("xuid.notfound", pl);
                return;
            }
            __1.EconomyX.removeMoney(tr, p.money);
            message_1.sendTranslate.success("command.removemoney.r", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("setmoney", message_1.send.translate("command.setmoney.d"), command_1.CommandPermissionLevel.Operator)
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
                message_1.sendTranslate.error("number.invalid", pl);
                return;
            }
            if (__1.EconomyX.getPlayer(tr) === null) {
                message_1.sendTranslate.error("xuid.notfound", pl);
                return;
            }
            __1.EconomyX.setMoney(tr, p.money);
            message_1.sendTranslate.success("command.setmoney.r", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBaUY7QUFDakYsMENBQXVDO0FBQ3ZDLGdEQUEwQztBQUMxQywwQkFBOEI7QUFDOUIsNkNBQXNEO0FBRXRELGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxjQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDL0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBRXhCLHVCQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLFlBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxZQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9ILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVQLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDM0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFD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