import { type Awaitable, type ClientEvents } from "discord.js";
import { events } from "../lib/collections";
import { ExtendedClient } from "../lib/client";

export type Event<K extends keyof ClientEvents> = {
  name: K;
  options?: { once?: boolean };
  callback: (
    props: {
      client: ExtendedClient;
      log: (from: string, ...args: unknown[]) => void;
    },
    ...args: ClientEvents[K]
  ) => Awaitable<unknown>;
};

export function createEvent<K extends keyof ClientEvents>(
  name: Event<K>["name"],
  callback: Event<K>["callback"],
  options?: Event<K>["options"]
) {
  events.set(name, {
    name,
    options,
    callback: callback,
  } as Event<keyof ClientEvents>);
}
