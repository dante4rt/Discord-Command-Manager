const Discord = require('discord-simple-api');

class CommandManager {
  constructor(discordInstance) {
    if (!(discordInstance instanceof Discord)) {
      throw new Error('discordInstance must be an instance of Discord');
    }
    this.discord = discordInstance;
    this.commands = new Map();
  }

  registerCommand(commandName, callback) {
    if (this.commands.has(commandName)) {
      throw new Error(`The command "${commandName}" is already registered.`);
    }

    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }

    this.commands.set(commandName, callback);
    console.log(`Command "${commandName}" registered successfully.`);
  }

  generateHelpCommand() {
    this.registerCommand('help', async (args, message) => {
      const helpText = Array.from(this.commands.keys())
        .map((command) => `**${command}**: Usage details here.`) 
        .join('\n');

      await this.discord.sendMessageToChannel(
        message.channel.id,
        `Available Commands:\n${helpText}`
      );
    });
  }

  async handleMessage(message) {
    if (message.author.bot) return;

    const parts = message.content.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (this.commands.has(command)) {
      try {
        const callback = this.commands.get(command);
        await callback(args, message);
      } catch (error) {
        console.error(`Error executing command "${command}":`, error);
        await this.discord.sendMessageToChannel(
          message.channel.id,
          'An error occurred while executing the command.'
        );
      }
    }
  }
}

module.exports = CommandManager;
