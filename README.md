# Discord Command Manager

A lightweight and flexible command manager for Discord bots, designed to work seamlessly with the `discord-simple-api` package. This command manager simplifies the process of handling commands and provides a structured way to organize your bot's functionalities.

## Features

- **Easy Command Registration**: Register commands with their callbacks for efficient command handling.
- **Help Command Generation**: Automatically generates a help command that lists all available commands and their descriptions.
- **Error Handling**: Built-in error handling to ensure smooth command execution and feedback on execution errors.
- **Bot Message Ignoring**: Automatically ignores messages from bots to prevent command loops.

## Installation

Ensure you have `discord-simple-api` installed in your project. If not, you can install it along with `discord-command-manager` using npm:

```bash
npm install discord-simple-api
npm install discord-command-manager
```

## Usage

First, initialize your `Discord` instance from `discord-simple-api` and then create a `CommandManager` instance with it:

```javascript
const Discord = require('discord-simple-api');
const CommandManager = require('discord-command-manager');

// Initialize the Discord instance with your bot token
const discordInstance = new Discord('YOUR_DISCORD_BOT_TOKEN');

// Create the CommandManager instance
const commandManager = new CommandManager(discordInstance);

// Register commands
commandManager.registerCommand('hello', async (args, message) => {
  // Logic for the command
  console.log(`Hello command triggered by ${message.author.username}`);
});

// Generate a help command
commandManager.generateHelpCommand();

// Example handleMessage usage within an onMessage listener
discordInstance.on('message', message => {
  commandManager.handleMessage(message);
});
```

## Registering Commands

To register a command, use the `registerCommand` method. It takes a command name and a callback function as arguments. The callback function is called with `args` and `message` when the command is triggered:

```javascript
commandManager.registerCommand('greet', async (args, message) => {
  const reply = `Hello, ${args[0]}!`;
  // Assuming sendMessageToChannel sends a message to the specified channel
  await discordInstance.sendMessageToChannel(message.channel.id, reply);
});
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, feel free to make a pull request or open an issue.