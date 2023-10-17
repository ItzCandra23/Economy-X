"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const __1 = require("..");
const message_1 = require("./utils/message");
command_2.command.register("mymoney", "Check your money.")
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    message_1.send.msg("§aYour money is §e{money}", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});
command_2.command.register("money", "Check player money.")
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
                message_1.send.msg("§aYour money is §e{money}", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
            }
            else {
                message_1.send.msg("§d{player}§r §amoney is §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(tr).toLocaleString()}`]]);
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
    message_1.send.msg("§aYour money is §e{money}", pl, ["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});
command_2.command.register("pay", "Transfer money to target.")
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
                message_1.send.error("You can't transfer to yourself", pl);
            }
            else {
                if (p.money < 1) {
                    message_1.send.error("Invalid number!", pl);
                    return;
                }
                if (__1.EconomyX.getPlayer(pl) === null) {
                    message_1.send.error("Your xuid not found!", pl);
                    return;
                }
                if (__1.EconomyX.getPlayer(tr) === null) {
                    message_1.send.error("Target xuid not found!", pl);
                    return;
                }
                if (__1.EconomyX.getMoney(pl) - p.money < 0) {
                    message_1.send.success("Successfully transfer §e{money} §ato §d{player}", pl, [["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", tr.getName()]]);
                    message_1.send.success("You have transferred §e{money} §afrom §d{player}", tr, [["{money}", `${__1.EconomyX.currency()}${__1.EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", pl.getName()]]);
                    __1.EconomyX.transfer(pl, tr, p.money);
                    return;
                }
                message_1.send.success("Successfully transfer §e{money} §ato §d{player}", pl, [["{money}", `${__1.EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", tr.getName()]]);
                message_1.send.success("You have transferred §e{money} §afrom §d{player}", tr, [["{money}", `${__1.EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", pl.getName()]]);
                __1.EconomyX.transfer(pl, tr, p.money);
            }
        }
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("addmoney", "Add player money.", command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    for (const tr of p.target.newResults(o)) {
        const data = __1.PlayerEconomy.getPlayer(tr);
        if (!data) {
            message_1.send.error("Xuid not found!", pl);
            return;
        }
        data.addMoney(p.money)
            .then((value) => {
            message_1.send.success("{player}'s§r §amoney has been added §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        })
            .catch((err) => {
            if (err)
                message_1.send.error(err, pl);
        });
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("removemoney", "Remove player money.", command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    for (const tr of p.target.newResults(o)) {
        const data = __1.PlayerEconomy.getPlayer(tr);
        if (!data) {
            message_1.send.error("Xuid not found!", pl);
            return;
        }
        data.removeMoney(p.money)
            .then((value) => {
            message_1.send.success("{player}'s§r §amoney has been removed §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        })
            .catch((err) => {
            if (err)
                message_1.send.error(err, pl);
        });
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
command_2.command.register("setmoney", "Set player money.", command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    var _a, _b;
    const pl = (_b = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor()) !== null && _b !== void 0 ? _b : undefined;
    for (const tr of p.target.newResults(o)) {
        const data = __1.PlayerEconomy.getPlayer(tr);
        if (!data) {
            message_1.send.error("Xuid not found!", pl);
            return;
        }
        data.setMoney(p.money)
            .then((value) => {
            message_1.send.success("{player}'s§r §amoney has been seted §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${__1.EconomyX.currency()}${p.money}`]]);
        })
            .catch((err) => {
            if (err)
                message_1.send.error(err, pl);
        });
    }
}, {
    target: command_1.PlayerCommandSelector,
    money: nativetype_1.int32_t
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFpRjtBQUNqRiwwQ0FBdUM7QUFDdkMsZ0RBQTBDO0FBQzFDLDBCQUE2QztBQUM3Qyw2Q0FBdUM7QUFFdkMsaUJBQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDO0tBQy9DLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1FBQUUsT0FBTztJQUV4QixjQUFJLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLFlBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxZQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVQLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQztLQUMvQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtRQUFFLE9BQU87SUFF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