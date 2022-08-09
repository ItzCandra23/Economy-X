"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./economy");
require("./command");
const event_1 = require("bdsx/event");
const economy_1 = require("./economy");
event_1.events.playerJoin.on(ev => {
    if (economy_1.EconomyX.addPlayer(ev.player) === false) {
        console.log(`[Economy-X] ${ev.player.getName()} joined. [ Money: ${economy_1.EconomyX.currency()}${economy_1.EconomyX.getMoney(ev.player)} ]`);
    }
    else {
        console.log(`[Economy-X] ${ev.player.getName()} new player joined!`);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFCQUFtQjtBQUNuQixxQkFBbUI7QUFDbkIsc0NBQW9DO0FBQ3BDLHVDQUFxQztBQUVyQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixJQUFJLGtCQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUU7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHFCQUFxQixrQkFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLGtCQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUg7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0tBQ3hFO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==