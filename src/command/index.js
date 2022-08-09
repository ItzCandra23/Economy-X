"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const economy_1 = require("../economy");
event_1.events.serverOpen.on(() => {
    command_2.command.register('mymoney', 'Check your money.')
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage(`§aYour money is §e${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(pl)}`);
    }, {});
    command_2.command.register('money', 'Check player money.')
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage(`§aYour money is §e${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(pl)}`);
    }, {})
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (pl === tr) {
                    pl.sendMessage(`§aYour money is §e${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(pl)}`);
                    return;
                }
                pl.sendMessage(`§d${tr.getName()}§r§a money is §e${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(tr)}`);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector
    });
    command_2.command.register('pay', 'Pay to player.')
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (pl === tr) {
                    pl.sendMessage(`§cYou can't pay to yourself.`);
                    return;
                }
                if (p.amount < 0 || p.amount === 0 || economy_1.EconomyX.getMoney(pl) - p.amount < 0) {
                    pl.sendMessage(`§cInvalid number!`);
                    return;
                }
                economy_1.EconomyX.removeMoney(pl, p.amount);
                economy_1.EconomyX.addMoney(tr, p.amount);
                pl.sendMessage(`§aSuccessfuly pay §e${economy_1.EconomyX.currency()}${p.amount}§a to §d${tr.getName()}`);
                tr.sendMessage(`§d${pl.getName()}§r§a has pay §e${economy_1.EconomyX.currency()}${p.amount}`);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t
    });
    command_2.command.register('addmoney', 'Add player money.', command_1.CommandPermissionLevel.Operator)
        .overload((p, o, op) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.amount < 0 || p.amount === 0) {
                    op.error(`§cInvalid number!`);
                    return;
                }
                economy_1.EconomyX.addMoney(tr, p.amount);
                op.success(`Successfully added ${economy_1.EconomyX.currency()}${p.amount} to ${tr.getName()}`);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t
    });
    command_2.command.register('removemoney', 'Remove player money.', command_1.CommandPermissionLevel.Operator)
        .overload((p, o, op) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.amount < 0 || p.amount === 0) {
                    op.error(`§cInvalid number!`);
                    return;
                }
                if (economy_1.EconomyX.getMoney(tr) - p.amount < 0) {
                    op.success(`Successfully removed ${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(tr)} to ${tr.getName()}`);
                    economy_1.EconomyX.removeMoney(tr, economy_1.EconomyX.getMoney(tr));
                }
                economy_1.EconomyX.removeMoney(tr, p.amount);
                op.success(`Successfully removed ${economy_1.EconomyX.currency()}${p.amount} to ${tr.getName()}`);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t
    });
    command_2.command.register('setmoney', 'Set player money.', command_1.CommandPermissionLevel.Operator)
        .overload((p, o, op) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (p.amount < 0) {
                    op.error(`§cInvalid number!`);
                    return;
                }
                economy_1.EconomyX.setMoney(tr, p.amount);
                op.success(`Successfully seted ${economy_1.EconomyX.currency()}${p.amount} to ${tr.getName()}`);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUF3RztBQUN4RywwQ0FBdUM7QUFDdkMsc0NBQW9DO0FBQ3BDLGdEQUEwQztBQUMxQyx3Q0FBc0M7QUFHdEMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQzFCLGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQztTQUMvQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU87UUFFeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsa0JBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxrQkFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsaUJBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDO1NBQy9DLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTztRQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUV4QixFQUFF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