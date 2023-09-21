import { ClientEvents, Collection } from "discord.js";
import { Event } from "../utils/event";

export const events = new Collection<
  keyof ClientEvents,
  Event<keyof ClientEvents>
>();
