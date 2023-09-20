import { type Awaitable, type ClientEvents } from "discord.js";
import { events } from "./collections";
import { ExtendedClient } from "./client";

type EventCallback<Key extends keyof ClientEvents> = (
  client: ExtendedClient,
  ...args: ClientEvents[Key]
) => Awaitable<void>;

type EventOptions = {
  once?: boolean;
};

export type Event<K extends keyof ClientEvents> = {
  name: K;
  options: EventOptions;
  callback: EventCallback<K>;
};

export function createEvent<T extends keyof ClientEvents>(
  name: T,
  callback: EventCallback<T>,
  options?: EventOptions
) {
  events.set(name, {
    name,
    options,
    callback: callback as EventCallback<keyof ClientEvents>,
  } as Event<keyof ClientEvents>);

  return {
    name,
    options,
    callback: callback as EventCallback<keyof ClientEvents>,
  } as Event<keyof ClientEvents>;
}
