const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commands = new Collection();

// load all commands in the folder "commands"
fs.readdirSync('./commands').forEach((file) => {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
});

client.on('ready', () => {
  console.log('Bot Ready');
  
  // Register slash commands
  client.guilds.cache.forEach(guild => {
    guild.commands.set(Array.from(commands.values()));
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (command) {
    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Error', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
