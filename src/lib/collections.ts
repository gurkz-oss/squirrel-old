import { ClientEvents, Collection } from "discord.js";
import { Event } from "../utils/event";
import { Command } from "../utils/command";

export const events = new Collection<
  keyof ClientEvents,
  Event<keyof ClientEvents>
>();
export const commands = new Collection<string, Command>();
