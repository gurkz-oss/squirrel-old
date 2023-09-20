import { GatewayIntentBits } from "discord.js";
import { env } from "./lib/env";
import { ExtendedClient } from "./lib/client";

const intents = [GatewayIntentBits.Guilds];

const client = new ExtendedClient({
  intents,
});

void client.start(env.TOKEN);
