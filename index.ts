import "./src";
import { events } from "bdsx/event";

events.serverOpen.on(() => {
    console.log(`[Economy-X] Started!`);
});