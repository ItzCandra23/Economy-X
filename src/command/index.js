"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const api_1 = require("../api");
event_1.events.serverOpen.on(() => {
    command_2.command.register("mymoney", (0, api_1.translate)("command.mymoney.d"))
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage((0, api_1.translate)("command.mymoney.r").replace("%money%", `${api_1.EconomyX.currency()}${api_1.EconomyX.getMoney(pl)}`));
    }, {});
    command_2.command.register("money", (0, api_1.translate)("command.money.d"))
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
                    pl.sendMessage((0, api_1.translate)("command.mymoney.r").replace("%money%", `${api_1.EconomyX.currency()}${api_1.EconomyX.getMoney(pl)}`));
                }
                else {
                    pl.sendMessage((0, api_1.translate)("command.money.r").replace("%player%", tr.getName()).replace("%money%", `${api_1.EconomyX.currency()}${api_1.EconomyX.getMoney(tr)}`));
                }
            }
        }
    }, {
        target: command_1.PlayerCommandSelector
    });
    command_2.command.register("transfer", (0, api_1.translate)("command.transfer.d"))
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
                    pl.sendMessage((0, api_1.translate)("transfer.sameplayer"));
                }
                else {
                    if (p.money < 1) {
                        pl.sendMessage((0, api_1.translate)("number.invalid"));
                        return;
                    }
                    if (api_1.EconomyX.getPlayer(pl) === null) {
                        pl.sendMessage((0, api_1.translate)("transfer.player.xuidnotfound"));
                        return;
                    }
                    if (api_1.EconomyX.getPlayer(tr) === null) {
                        pl.sendMessage((0, api_1.translate)("transfer.target.xuidnotfound"));
                        return;
                    }
                    if (api_1.EconomyX.getMoney(pl) - p.money < 0) {
                        pl.sendMessage((0, api_1.translate)("transfer.player.success").replace("%money%", `${api_1.EconomyX.currency()}${api_1.EconomyX.getMoney(pl)}`).replace("%player%", tr.getName()));
                        tr.sendMessage((0, api_1.translate)("transfer.target.success").replace("%money%", `${api_1.EconomyX.currency()}${api_1.EconomyX.getMoney(pl)}`).replace("%player%", pl.getName()));
                        api_1.EconomyX.transfer(pl, tr, p.money);
                        return;
                    }
                    pl.sendMessage((0, api_1.translate)("transfer.player.success").replace("%money%", `${api_1.EconomyX.currency()}${p.money}`).replace("%player%", tr.getName()));
                    tr.sendMessage((0, api_1.translate)("transfer.target.success").replace("%money%", `${api_1.EconomyX.currency()}${p.money}`).replace("%player%", pl.getName()));
                    api_1.EconomyX.transfer(pl, tr, p.money);
                }
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        money: nativetype_1.int32_t
    });
    command_2.command.register("addmoney", (0, api_1.translate)("command.addmoney.d"), command_1.CommandPermissionLevel.Operator)
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
                    pl.sendMessage((0, api_1.translate)("number.invalid"));
                    return;
                }
                if (api_1.EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage((0, api_1.translate)("xuid.notfound"));
                    return;
                }
                api_1.EconomyX.addMoney(tr, p.money);
                pl.sendMessage((0, api_1.translate)("command.addmoney.r").replace("%player%", tr.getName()).replace("%money%", `${api_1.EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        money: nativetype_1.int32_t
    });
    command_2.command.register("removemoney", (0, api_1.translate)("command.removemoney.d"), command_1.CommandPermissionLevel.Operator)
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
                    pl.sendMessage((0, api_1.translate)("number.invalid"));
                    return;
                }
                if (api_1.EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage((0, api_1.translate)("xuid.notfound"));
                    return;
                }
                api_1.EconomyX.removeMoney(tr, p.money);
                pl.sendMessage((0, api_1.translate)("command.removemoney.r").replace("%player%", tr.getName()).replace("%money%", `${api_1.EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        money: nativetype_1.int32_t
    });
    command_2.command.register("setmoney", (0, api_1.translate)("command.setmoney.d"), command_1.CommandPermissionLevel.Operator)
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
                    pl.sendMessage((0, api_1.translate)("number.invalid"));
                    return;
                }
                if (api_1.EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage((0, api_1.translate)("xuid.notfound"));
                    return;
                }
                api_1.EconomyX.setMoney(tr, p.money);
                pl.sendMessage((0, api_1.translate)("command.setmoney.r").replace("%player%", tr.getName()).replace("%money%", `${api_1.EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        money: nativetype_1.int32_t
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFpRjtBQUNqRiwwQ0FBdUM7QUFDdkMsc0NBQW9DO0FBQ3BDLGdEQUEwQztBQUMxQyxnQ0FBbUQ7QUFFbkQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3RCLGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFBLGVBQVMsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzFELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTztRQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUV4QixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUEsZUFBUyxFQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLGNBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxjQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFBLGVBQVMsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3RELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTztRQUM1QixNQUFNLEVBQUUs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