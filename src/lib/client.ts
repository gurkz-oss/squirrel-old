import { Client } from "discord.js";
import { events } from "./collections";
import { directoryImport } from "directory-import";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ExtendedClient extends Client<true> {
  async start(token: string) {
    this.loadEvents();
    await this.login(token);
  }

  loadEvents() {
    // import all events (this is only so that the createEvent gets fired)
    try {
      directoryImport("../events/");
    } catch (err) {
      console.error("couldn't import all files");
    }

    events.forEach((event) => {
      if (event.options.once) {
        console.log(event);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.once(event.name, (...args) => event.callback(this, ...args));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.on(event.name, (...args) => event.callback(this, ...args));
      }
    });
  }
}
