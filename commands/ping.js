module.exports = {
  name: 'ping',
  description: 'pong',
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      try {
        const user = interaction.user.username;
        const replyContent = `${user} used ping`;
        await interaction.deferReply();
        await interaction.followUp('https://cdn.discordapp.com/attachments/926186240708071475/1109863238562218145/RPReplay_Final1684512997.mov');
      } catch (error) {
        console.error('error', error);
      }
    }
  },
};