#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const program = new Command();
program.version('1.0.0', '-v, --version', 'Output the current version');
program
    .command('greet [name]')
    .description('Greet a user by name')
    .action((name) => {
    console.log(chalk.green(`Hello, ${name || 'user'}! Welcome to Cosmic CLI!`));
});
program
    .command('add <num1> <num2>')
    .description('Add two numbers')
    .action((num1, num2) => {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b))
        return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The sum is ${a + b}`));
});
program
    .command('subtract <num1> <num2>')
    .description('Subtract the second number from the first')
    .action((num1, num2) => {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b))
        return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The difference is ${a - b}`));
});
program
    .command('multiply <num1> <num2>')
    .description('Multiply two numbers')
    .action((num1, num2) => {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b))
        return console.log(chalk.red('Both arguments must be numbers.'));
    console.log(chalk.yellow(`The product is ${a * b}`));
});
program
    .command('divide <num1> <num2>')
    .description('Divide the first number by the second')
    .action((num1, num2) => {
    const a = parseFloat(num1), b = parseFloat(num2);
    if (isNaN(a) || isNaN(b))
        return console.log(chalk.red('Both arguments must be numbers.'));
    if (b === 0)
        return console.log(chalk.red('Division by zero is not allowed.'));
    console.log(chalk.yellow(`The quotient is ${a / b}`));
});
program
    .command('hasao')
    .description('Fetch a random joke from the internet')
    .action(async () => {
    try {
        const { data } = await axios.get('https://official-joke-api.appspot.com/random_joke');
        console.log(chalk.magenta(`${data.setup}`));
        console.log(chalk.cyan(`   ${data.punchline}`));
    }
    catch (err) {
        console.log(chalk.red('Could not fetch a joke. Check your internet.'));
    }
});
program
    .command('github <username>')
    .description('Fetch GitHub user info')
    .action(async (username) => {
    var _a, _b;
    try {
        const { data } = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
        console.log(chalk.green(`\nGitHub User: ${data.login}`));
        console.log(`   Name        : ${(_a = data.name) !== null && _a !== void 0 ? _a : 'N/A'}`);
        console.log(`   Bio         : ${(_b = data.bio) !== null && _b !== void 0 ? _b : 'N/A'}`);
        console.log(`   Public Repos: ${data.public_repos}`);
        console.log(`   Followers   : ${data.followers}`);
        console.log(`   Following   : ${data.following}`);
        console.log(chalk.cyan(`   Profile     : ${data.html_url}\n`));
    }
    catch (err) {
        console.log(chalk.red(`GitHub user "${username}" not found.`));
    }
});
program
    .command('quote')
    .description('Fetch a random inspirational quote')
    .action(async () => {
    try {
        const { data } = await axios.get('https://dummyjson.com/quotes/random');
        console.log(chalk.cyan(`\n"${data.quote}"`));
        console.log(chalk.gray(`           — ${data.author}\n`));
    }
    catch (err) {
        console.log(chalk.red('Could not fetch a quote. Check your internet.'));
    }
});
program
    .command('coinflip')
    .description('Flip a coin — heads or tails?')
    .action(() => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    console.log(chalk.yellow(`The coin landed on: ${chalk.bold(result)}`));
});
program
    .command('roll [sides]')
    .description('Roll a dice with [sides] faces (default: 6)')
    .action((sides) => {
    const n = parseInt(sides) || 6;
    if (n < 2)
        return console.log(chalk.red('Dice must have at least 2 sides.'));
    const roll = Math.floor(Math.random() * n) + 1;
    console.log(chalk.yellow(`You rolled a ${chalk.bold(roll)} (d${n})`));
});
program
    .command('fileinfo <filename>')
    .description('Show basic info about a file (size, path, extension)')
    .action((filename) => {
    const fs = require('fs');
    const path = require('path');
    const fullPath = path.resolve(filename);
    if (!fs.existsSync(fullPath))
        return console.log(chalk.red(`File not found: ${fullPath}`));
    const stats = fs.statSync(fullPath);
    console.log(chalk.green(`\nFile Info: ${path.basename(fullPath)}`));
    console.log(`   Full Path : ${fullPath}`);
    console.log(`   Extension : ${path.extname(fullPath) || 'none'}`);
    console.log(`   Size      : ${stats.size} bytes`);
    console.log(`   Modified  : ${stats.mtime.toLocaleString()}\n`);
});
program.parse();
