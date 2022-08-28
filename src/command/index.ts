import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { int32_t } from "bdsx/nativetype";
import { EconomyX, ecoR, translate } from "../api";

events.serverOpen.on(() => {
    command.register("mymoney", translate("command.mymoney.d"))
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        pl.sendMessage(translate("command.mymoney.r").replace("%money%", `${EconomyX.currency()}${EconomyX.getMoney(pl)}`));
    }, {});

    command.register("money", translate("command.money.d"))
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (tr === pl) {
                    pl.sendMessage(translate("command.mymoney.r").replace("%money%", `${EconomyX.currency()}${EconomyX.getMoney(pl)}`));
                } else {
                    pl.sendMessage(translate("command.money.r").replace("%player%", tr.getName()).replace("%money%", `${EconomyX.currency()}${EconomyX.getMoney(tr)}`));
                }
            }
        }
    }, {
        target: PlayerCommandSelector
    });

    command.register("transfer", translate("command.transfer.d"))
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (tr === pl) {
                    pl.sendMessage(translate("transfer.sameplayer"));
                } else {
                    if (p.money < 1) {
                        pl.sendMessage(translate("number.invalid"));
                        return;
                    }
                    if (EconomyX.getPlayer(pl) === null) {
                        pl.sendMessage(translate("transfer.player.xuidnotfound"));
                        return;
                    }
                    if (EconomyX.getPlayer(tr) === null) {
                        pl.sendMessage(translate("transfer.target.xuidnotfound"));
                        return;
                    }
                    if (EconomyX.getMoney(pl)-p.money < 0) {
                        pl.sendMessage(translate("transfer.player.success").replace("%money%", `${EconomyX.currency()}${EconomyX.getMoney(pl)}`).replace("%player%", tr.getName()));
                        tr.sendMessage(translate("transfer.target.success").replace("%money%", `${EconomyX.currency()}${EconomyX.getMoney(pl)}`).replace("%player%", pl.getName()));
                        EconomyX.transfer(pl, tr, p.money);
                        return;
                    }
                    pl.sendMessage(translate("transfer.player.success").replace("%money%", `${EconomyX.currency()}${p.money}`).replace("%player%", tr.getName()));
                    tr.sendMessage(translate("transfer.target.success").replace("%money%", `${EconomyX.currency()}${p.money}`).replace("%player%", pl.getName()));
                    EconomyX.transfer(pl, tr, p.money);
                }
            }
        }
    }, {
        target: PlayerCommandSelector,
        money: int32_t
    });

    command.register("addmoney", translate("command.addmoney.d"), CommandPermissionLevel.Operator)
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.money < 1) {
                    pl.sendMessage(translate("number.invalid"));
                    return;
                }
                if (EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage(translate("xuid.notfound"));
                    return;
                }
                EconomyX.addMoney(tr, p.money);
                pl.sendMessage(translate("command.addmoney.r").replace("%player%", tr.getName()).replace("%money%", `${EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: PlayerCommandSelector,
        money: int32_t
    });

    command.register("removemoney", translate("command.removemoney.d"), CommandPermissionLevel.Operator)
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.money < 1) {
                    pl.sendMessage(translate("number.invalid"));
                    return;
                }
                if (EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage(translate("xuid.notfound"));
                    return;
                }
                EconomyX.removeMoney(tr, p.money);
                pl.sendMessage(translate("command.removemoney.r").replace("%player%", tr.getName()).replace("%money%", `${EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: PlayerCommandSelector,
        money: int32_t
    });

    command.register("setmoney", translate("command.setmoney.d"), CommandPermissionLevel.Operator)
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.money < 0) {
                    pl.sendMessage(translate("number.invalid"));
                    return;
                }
                if (EconomyX.getPlayer(tr) === null) {
                    pl.sendMessage(translate("xuid.notfound"));
                    return;
                }
                EconomyX.setMoney(tr, p.money);
                pl.sendMessage(translate("command.setmoney.r").replace("%player%", tr.getName()).replace("%money%", `${EconomyX.currency()}${p.money}`));
            }
        }
    }, {
        target: PlayerCommandSelector,
        money: int32_t
    });
});