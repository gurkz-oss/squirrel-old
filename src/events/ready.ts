import { Events } from "discord.js";
import { createEvent } from "../utils/event";

createEvent(
  Events.ClientReady,
  ({ log, client: c }) => {
    log(`ready as ${c.user.tag}`);
  },
  { once: true }
);
