import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { EconomyX, PlayerEconomy } from "..";
import { send } from "./utils/message";

command.register("mymoney", "Check your money.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    send.msg("§aYour money is §e{money}", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});

command.register("money", "Check player money.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                send.msg("§aYour money is §e{money}", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
            } else {
                send.msg("§d{player}§r §amoney is §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(tr).toLocaleString()}`]]);
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

    send.msg("§aYour money is §e{money}", pl, ["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`]);
}, {});

command.register("pay", "Transfer money to target.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                send.error("You can't transfer to yourself", pl);
            } else {
                if (p.money < 1) {
                    send.error("Invalid number!", pl);
                    return;
                }
                if (EconomyX.getPlayer(pl) === null) {
                    send.error("Your xuid not found!", pl);
                    return;
                }
                if (EconomyX.getPlayer(tr) === null) {
                    send.error("Target xuid not found!", pl);
                    return;
                }
                if (EconomyX.getMoney(pl)-p.money < 0) {
                    send.success("Successfully transfer §e{money} §ato §d{player}", pl, [["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", tr.getName()]]);
                    send.success("You have transferred §e{money} §afrom §d{player}", tr, [["{money}", `${EconomyX.currency()}${EconomyX.getMoney(pl).toLocaleString()}`], ["{player}", pl.getName()]]);
                    EconomyX.transfer(pl, tr, p.money);
                    return;
                }
                send.success("Successfully transfer §e{money} §ato §d{player}", pl, [["{money}", `${EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", tr.getName()]]);
                send.success("You have transferred §e{money} §afrom §d{player}", tr, [["{money}", `${EconomyX.currency()}${p.money.toLocaleString()}`], ["{player}", pl.getName()]]);
                EconomyX.transfer(pl, tr, p.money);
            }
        }
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("addmoney", "Add player money.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    for (const tr of p.target.newResults(o)) {
        const data = PlayerEconomy.getPlayer(tr);

        if (!data) {
            send.error("Xuid not found!", pl);
            return;
        }

        data.addMoney(p.money)
        .then((value) => {
            send.success("{player}'s§r §amoney has been added §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        })
        .catch((err) => {
            if (err) send.error(err, pl);
        });
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("removemoney", "Remove player money.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    for (const tr of p.target.newResults(o)) {
        const data = PlayerEconomy.getPlayer(tr);

        if (!data) {
            send.error("Xuid not found!", pl);
            return;
        }

        data.removeMoney(p.money)
        .then((value) => {
            send.success("{player}'s§r §amoney has been removed §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        })
        .catch((err) => {
            if (err) send.error(err, pl);
        });
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});

command.register("setmoney", "Set player money.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    const pl = o.getEntity()?.getNetworkIdentifier().getActor() ?? undefined;

    for (const tr of p.target.newResults(o)) {
        const data = PlayerEconomy.getPlayer(tr);

        if (!data) {
            send.error("Xuid not found!", pl);
            return;
        }

        data.setMoney(p.money)
        .then((value) => {
            send.success("{player}'s§r §amoney has been seted §e{money}", pl, [["{player}", tr.getName()], ["{money}", `${EconomyX.currency()}${p.money}`]]);
        })
        .catch((err) => {
            if (err) send.error(err, pl);
        });
    }
}, {
    target: PlayerCommandSelector,
    money: int32_t
});