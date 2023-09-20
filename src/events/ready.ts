import { Events } from "discord.js";
import { createEvent } from "../lib/event";

createEvent(
  Events.ClientReady,
  (c) => {
    console.log(`ready as ${c.user.tag}`);
  },
  { once: true }
);
