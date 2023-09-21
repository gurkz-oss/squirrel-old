import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createCommand } from "../utils/command";

createCommand(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("get the bot's current ping"),
  async ({ interaction }) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    const heartbeat = Math.round(interaction.client.ws.ping);

    const embed = new EmbedBuilder()
      .addFields(
        {
          name: "Client",
          value: `${ping}ms`,
          inline: true,
        },
        {
          name: "Websocket",
          value: `${
            heartbeat === -1
              ? "Please wait, the bot is starting..."
              : `${heartbeat}ms`
          }`,
          inline: true,
        }
      )
      .setTitle("Current ping")
      .setTimestamp();
    await interaction.followUp({ embeds: [embed] });
  }
);
