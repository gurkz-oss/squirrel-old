import { Events } from "discord.js";
import { createEvent } from "../utils/event";

createEvent(
  Events.ClientReady,
  (c, log) => {
    log(`ready as ${c.user.tag}`);
  },
  { once: true }
);
