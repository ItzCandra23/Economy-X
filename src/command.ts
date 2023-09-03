import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { EconomyX } from "..";
import { send, sendTranslate } from "./utils/message";

command.register("mymoney", send.translate("command.mymoney.d"))
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});

command.register("money", send.translate("command.money.d"))
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
            } else {
                sendTranslate.msg("command.money.r", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(tr).toLocaleString()}`]]);
            }
         }
    }
}, {
    target: PlayerCommandSelector
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    sendTranslate.msg("command.mymoney.r", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});

command.register("transfer", send.translate("command.transfer.d"))
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                sendTranslate.error("transfer.sameplayer", pl);
            } else {
                if (p.money < 1) {
                    sendTranslate.error("number.invalid", pl);
                    return;
                }
                if (EconomyX.getPlayer(pl) === null) {
                    sendTranslate.error("transfer.player.xuidnotfound", pl);
                    return;
                }
                if (EconomyX.getPlayer(tr) === null) {
                    sendTranslate.error("transfer.target.xuidnotfound", pl);
                    return;
                }
                if (EconomyX.getMoney(pl)-p.money < 0) {
                    sendTranslate.msg("transfer.player.success", pl, [["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", tr.getName()]]);
                    sendTranslate.msg("transfer.target.success", pl, [["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", pl.getName()]]);
                    EconomyX.transfer(pl, tr, p.money);
                    return;
                }
                sendTranslate.msg("transfer.player.success", pl, [["{money}", `${EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", tr.getName()]]);
                sendTranslate.msg("transfer.target.success", pl, [["{money}", `${EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", pl.getName()]]);
                EconomyX.transfer(pl, tr, p.money);
            }
        }
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("addmoney", send.translate("command.addmoney.d"), CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 1) {
                sendTranslate.error("number.invalid", pl);
                return;
            }
            if (EconomyX.getPlayer(tr) === null) {
                sendTranslate.error("xuid.notfound", pl);
                return;
            }
            EconomyX.addMoney(tr, p.money);
            sendTranslate.success("command.addmoney.r", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("removemoney", send.translate("command.removemoney.d"), CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 1) {
                sendTranslate.error("number.invalid", pl);
                return;
            }
            if (EconomyX.getPlayer(tr) === null) {
                sendTranslate.error("xuid.notfound", pl);
                return;
            }
            EconomyX.removeMoney(tr, p.money);
            sendTranslate.success("command.removemoney.r", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("setmoney", send.translate("command.setmoney.d"), CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.money < 0) {
                sendTranslate.error("number.invalid", pl);
                return;
            }
            if (EconomyX.getPlayer(tr) === null) {
                sendTranslate.error("xuid.notfound", pl);
                return;
            }
            EconomyX.setMoney(tr, p.money);
            sendTranslate.success("command.setmoney.r", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        }
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});