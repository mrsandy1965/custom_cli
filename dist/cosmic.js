#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const program = new Command();
program
    .command('greet')
    .action(() => {
    console.log(`Hello, user! Welcome to the Cosmic CLI!`);
});
program
    .command('add <num1> <num2>')
    .description('Adds two numbers')
    .action((num1, num2) => {
    console.log(`The sum is ${parseInt(num1) + parseInt(num2)}`);
});
program
    .command('subtract <num1> <num2>')
    .description('Subtracts the second number from the first')
    .action((num1, num2) => {
    console.log(`The difference is ${parseInt(num1) - parseInt(num2)}`);
});
program
    .command('multiply <num1> <num2>')
    .description('Multiplies two numbers')
    .action((num1, num2) => {
    console.log(`The product is ${parseInt(num1) * parseInt(num2)}`);
});
program
    .command('divide <num1> <num2>')
    .description('Divides the first number by the second')
    .action((num1, num2) => {
    if (parseInt(num2) === 0) {
        console.log('Error: Division by zero is not allowed.');
    }
    else {
        console.log(`The quotient is ${parseInt(num1) / parseInt(num2)}`);
    }
});
program
    .command('hasao')
    .description('Tells a joke')
    .action(async () => {
    try {
        const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const { data } = await res;
        console.log(`${data.setup} - ${data.punchline}`);
    }
    catch (err) {
        console.error('An error occurred while telling the joke:', err);
    }
});
program.parse();
