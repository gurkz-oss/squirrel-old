import { Events } from "discord.js";
import { createEvent } from "../utils/event";
import { commands } from "../lib/collections";

createEvent(Events.InteractionCreate, async (props, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const commandName = interaction.commandName;
    const command = commands.get(commandName);

    if (!command) throw new Error("command not found...");
    await command.callback({
      interaction,
      client: props.client,
    });
  } catch (err) {
    console.error(err);
    if (interaction.deferred) {
      return await interaction.editReply({
        content: "Aww, something went wrong!",
      });
    }

    return await interaction.reply({
      content: "Aww, something went wrong",
    });
  }
});
