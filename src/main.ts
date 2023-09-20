import { Client, Events, GatewayIntentBits } from "discord.js";
import { env } from "./lib/env";

const intents = [GatewayIntentBits.Guilds];

const client = new Client({
  intents,
});

client.once(Events.ClientReady, (c) => {
  console.log(`ready as ${c.user.tag}`);
});

void client.login(env.TOKEN);
