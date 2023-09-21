import {
  ApplicationCommand,
  Awaitable,
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
} from "discord.js";
import { ExtendedClient } from "../lib/client";
import { commands } from "../lib/collections";

export type Command = {
  data: SlashCommandBuilder;
  callback: ({
    interaction,
    client,
  }: {
    interaction: ChatInputCommandInteraction;
    client: ExtendedClient;
  }) => Awaitable<unknown>;
};

async function fetchExistingCommands(client: ExtendedClient) {
  const commands = await client.application.commands.fetch();
  return new Collection<string, ApplicationCommand>(
    commands.map((command) => [command.name, command])
  );
}

async function pushCommand(client: ExtendedClient, command: Command["data"]) {
  await client.application.commands.create(command.toJSON());
}

async function updateCommand(
  client: ExtendedClient,
  existingCommand: ApplicationCommand,
  newCommand: Command["data"]
) {
  await client.application.commands.edit(
    existingCommand.id,
    newCommand.toJSON()
  );
}

function shouldUpdateCommand(
  existingCommand: ApplicationCommand,
  newCommand: Command["data"]
) {
  return (
    existingCommand.description !== newCommand.description ||
    JSON.stringify(existingCommand.options) !==
      JSON.stringify(newCommand.toJSON().options)
  );
}

export function createCommand(
  data: Command["data"],
  callback: Command["callback"]
): void {
  const cmd: Command = {
    data: data,
    callback: callback,
  };
  commands.set(data.name, cmd);
}

async function deleteCommand(
  client: ExtendedClient,
  command: ApplicationCommand
) {
  await client.application.commands.delete(command.id);
}

export async function registerCommands(client: ExtendedClient) {
  try {
    console.log("Started refreshing application (/) commands.");

    const existingCommands = await fetchExistingCommands(client);
    commands.map(async (command, name) => {
      const existingCommand = existingCommands.get(name);

      if (!existingCommand) {
        await pushCommand(client, command.data);
        console.log(`Registered new command: ${name}`);
      } else {
        if (shouldUpdateCommand(existingCommand, command.data)) {
          await updateCommand(client, existingCommand, command.data);
          console.log(`Updated command: ${name}`);
        }
      }
    });

    for (const [name, existingCommand] of existingCommands) {
      const localCommand = commands.find((cmd) => cmd.data.name === name);
      if (!localCommand) {
        await deleteCommand(client, existingCommand);
        console.log(`Deleted command: ${existingCommand.name}`);
      }
    }

    console.log("Successfully refreshed application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
