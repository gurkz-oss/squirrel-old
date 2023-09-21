import { Client } from "discord.js";
import { events } from "./collections";
import { directoryImport } from "directory-import";
import { registerCommands } from "../utils/command";

export class ExtendedClient extends Client<true> {
  async start(token: string) {
    this.loadEvents();
    await this.login(token);
    await this.loadCommands();
  }

  loadEvents() {
    // import all events (this is only so that the createEvent gets fired)
    try {
      directoryImport("../events/");
    } catch (err) {
      console.error("couldn't import all files");
    }

    function log(from: string, ...args: unknown[]) {
      console.log(`[${from}]`, ...args);
    }

    events.forEach((event) => {
      if (event.options?.once) {
        this.once(event.name, (...args) => {
          event.callback(
            {
              client: this,
              log(...args) {
                log(event.name, ...args);
              },
            },
            ...args
          );
        });
      } else {
        this.on(event.name, (...args) => {
          event.callback(
            {
              client: this,
              log(...args) {
                log(event.name, ...args);
              },
            },
            ...args
          );
        });
      }
    });
  }

  async loadCommands() {
    // import all commands (this is only so that the createCommand gets fired)
    try {
      directoryImport("../commands/");
    } catch (err) {
      console.error("couldn't import all files");
    }
    await registerCommands(this);
  }
}
