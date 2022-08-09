import "./economy";
import "./command";
import { events } from "bdsx/event";
import { EconomyX } from "./economy";

events.playerJoin.on(ev => {
    if (EconomyX.addPlayer(ev.player) === false) {
        console.log(`[Economy-X] ${ev.player.getName()} joined. [ Money: ${EconomyX.currency()}${EconomyX.getMoney(ev.player)} ]`);
    } else {
        console.log(`[Economy-X] ${ev.player.getName()} new player joined!`);
        EconomyX.addMoney(ev.player, EconomyX.newplayermoney());
    }
});