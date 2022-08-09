import { CommandPermissionLevel, CommandVisibilityFlag, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { int32_t } from "bdsx/nativetype";
import { EconomyX } from "../economy";


events.serverOpen.on(() => {
command.register('mymoney', 'Check your money.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    pl.sendMessage(`§aYour money is §e${EconomyX.currency()}${EconomyX.getMoney(pl)}`);
}, {});

command.register('money', 'Check player money.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    pl.sendMessage(`§aYour money is §e${EconomyX.currency()}${EconomyX.getMoney(pl)}`);
}, {})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (pl === tr) {
                pl.sendMessage(`§aYour money is §e${EconomyX.currency()}${EconomyX.getMoney(pl)}`);
                return;
            }
            pl.sendMessage(`§d${tr.getName()}§r§a money is §e${EconomyX.currency()}${EconomyX.getMoney(tr)}`);
        }
    }
}, {
    target: PlayerCommandSelector
});

command.register('pay', 'Pay to player.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (pl === tr) {
                pl.sendMessage(`§cYou can't pay to yourself.`);
                return;
            }
            if (p.amount < 0||p.amount === 0||EconomyX.getMoney(pl)-p.amount < 0) {
                pl.sendMessage(`§cInvalid number!`);
                return;
            }
            EconomyX.removeMoney(pl, p.amount);
            EconomyX.addMoney(tr, p.amount);
            pl.sendMessage(`§aSuccessfuly pay §e${EconomyX.currency()}${p.amount}§a to §d${tr.getName()}`);
            tr.sendMessage(`§d${pl.getName()}§r§a has pay §e${EconomyX.currency()}${p.amount}`);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t
});

command.register('addmoney', 'Add player money.', CommandPermissionLevel.Operator)
.overload((p, o, op) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.amount < 0||p.amount === 0) {
                op.error(`§cInvalid number!`);
                return;
            }
            EconomyX.addMoney(tr, p.amount);
            op.success(`Successfully added ${EconomyX.currency()}${p.amount} to ${tr.getName()}`);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t
});

command.register('removemoney', 'Remove player money.', CommandPermissionLevel.Operator)
.overload((p, o, op) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.amount < 0||p.amount === 0) {
                op.error(`§cInvalid number!`);
                return;
            }
            if (EconomyX.getMoney(tr)-p.amount < 0) {
                op.success(`Successfully removed ${EconomyX.currency()}${EconomyX.getMoney(tr)} to ${tr.getName()}`);
                EconomyX.removeMoney(tr, EconomyX.getMoney(tr));
            }
            EconomyX.removeMoney(tr, p.amount);
            op.success(`Successfully removed ${EconomyX.currency()}${p.amount} to ${tr.getName()}`);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t
});

command.register('setmoney', 'Set player money.', CommandPermissionLevel.Operator)
.overload((p, o, op) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (p.amount < 0) {
                op.error(`§cInvalid number!`);
                return;
            }
            EconomyX.setMoney(tr, p.amount);
            op.success(`Successfully seted ${EconomyX.currency()}${p.amount} to ${tr.getName()}`);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t
});

command.register('ecosave', 'Save a economy data', CommandPermissionLevel.Host)
.overload(() => {
    EconomyX.save();
}, {});
});