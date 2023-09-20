import { ClientEvents, Collection } from "discord.js";
import { Event } from "./event";

export const events = new Collection<
  keyof ClientEvents,
  Event<keyof ClientEvents>
>();
