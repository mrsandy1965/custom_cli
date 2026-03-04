#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');

interface ICommand {
  execute(...args: any[]): void | Promise<void>;
}


class GreetCommand implements ICommand {
  execute(name: string) {
    console.log(chalk.green(`Hello, ${name || 'user'}! Welcome to Cosmic CLI!`));
  }
}

class AddCommand implements ICommand {
  execute(num1: string, num2: string) {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The sum is ${a + b}`));
  }
}

class SubtractCommand implements ICommand {
  execute(num1: string, num2: string) {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The difference is ${a - b}`));
  }
}

class MultiplyCommand implements ICommand {
  execute(num1: string, num2: string) {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The product is ${a * b}`));
  }
}

class DivideCommand implements ICommand {
  execute(num1: string, num2: string) {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
    if (b === 0) return console.log(chalk.red('Division by zero is not allowed.'));
    console.log(chalk.yellow(`The quotient is ${a / b}`));
  }
}

class JokeCommand implements ICommand {
  async execute() {
    try {
      const { data } = await axios.get('https://official-joke-api.appspot.com/random_joke');
      console.log(chalk.magenta(`${data.setup}`));
      console.log(chalk.cyan(`   ${data.punchline}`));
    } catch (err) {
      console.log(chalk.red('Could not fetch a joke. Check your internet.'));
    }
  }
}

class GitHubCommand implements ICommand {
  async execute(username: string) {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
      console.log(chalk.green(`\nGitHub User: ${data.login}`));
      console.log(`   Name        : ${data.name ?? 'N/A'}`);
      console.log(`   Bio         : ${data.bio ?? 'N/A'}`);
      console.log(`   Public Repos: ${data.public_repos}`);
      console.log(`   Followers   : ${data.followers}`);
      console.log(`   Following   : ${data.following}`);
      console.log(chalk.cyan(`   Profile     : ${data.html_url}\n`));
    } catch (err) {
      console.log(chalk.red(`GitHub user "${username}" not found.`));
    }
  }
}

class QuoteCommand implements ICommand {
  async execute() {
    try {
      const { data } = await axios.get('https://dummyjson.com/quotes/random');
      console.log(chalk.cyan(`\n"${data.quote}"`));
      console.log(chalk.gray(`           — ${data.author}\n`));
    } catch (err) {
      console.log(chalk.red('Could not fetch a quote. Check your internet.'));
    }
  }
}

class CoinFlipCommand implements ICommand {
  execute() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    console.log(chalk.yellow(`The coin landed on: ${chalk.bold(result)}`));
  }
}

class RollDiceCommand implements ICommand {
  execute() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(chalk.yellow(`You rolled a ${chalk.bold(roll)}`));
  }
}

class FileInfoCommand implements ICommand {
  execute(filename: string) {
    const fs = require('fs');
    const path = require('path');
    const fullPath = path.resolve(filename);
    if (!fs.existsSync(fullPath)) return console.log(chalk.red(`File not found: ${fullPath}`));
    const stats = fs.statSync(fullPath);
    console.log(chalk.green(`\nFile Info: ${path.basename(fullPath)}`));
    console.log(`   Full Path : ${fullPath}`);
    console.log(`   Extension : ${path.extname(fullPath) || 'none'}`);
    console.log(`   Size      : ${stats.size} bytes`);
    console.log(`   Modified  : ${stats.mtime.toLocaleString()}\n`);
  }
}
const program = new Command();
program.version('1.0.0', '-v, --version', 'Output the current version');
program
  .command('greet [name]')
  .description('Greet a user by name')
  .action((name: string) => new GreetCommand().execute(name));

program
  .command('add <num1> <num2>')
  .description('Add two numbers')
  .action((num1: string, num2: string) => new AddCommand().execute(num1, num2));

program
  .command('subtract <num1> <num2>')
  .description('Subtract the second number from the first')
  .action((num1: string, num2: string) => new SubtractCommand().execute(num1, num2));

program
  .command('multiply <num1> <num2>')
  .description('Multiply two numbers')
  .action((num1: string, num2: string) => new MultiplyCommand().execute(num1, num2));

program
  .command('divide <num1> <num2>')
  .description('Divide the first number by the second')
  .action((num1: string, num2: string) => new DivideCommand().execute(num1, num2));

program
  .command('hasao')
  .description('Fetch a random joke from the internet')
  .action(() => new JokeCommand().execute());

program
  .command('github <username>')
  .description('Fetch GitHub user info')
  .action((username: string) => new GitHubCommand().execute(username));

program
  .command('quote')
  .description('Fetch a random inspirational quote')
  .action(() => new QuoteCommand().execute());

program
  .command('coinflip')
  .description('Flip a coin — heads or tails?')
  .action(() => new CoinFlipCommand().execute());

program
  .command('roll')
  .description('Roll a dice')
  .action(() => new RollDiceCommand().execute());

program
  .command('fileinfo <filename>')
  .description('Show basic info about a file (size, path, extension)')
  .action((filename: string) => new FileInfoCommand().execute(filename));

program.parse();