# Cosmic CLI

A simple Node.js CLI built with TypeScript, [commander](https://www.npmjs.com/package/commander), and [axios](https://www.npmjs.com/package/axios).

## Features

- `greet` command
- Basic calculator commands:
	- `add <num1> <num2>`
	- `subtract <num1> <num2>`
	- `multiply <num1> <num2>`
	- `divide <num1> <num2>`
- `hasao` command to fetch a random joke from an external API

## Requirements

- Node.js `20.x` (LTS recommended)
- npm

## Installation

```bash
npm install
```

## Build

Compile TypeScript to JavaScript:

```bash
npx tsc
```

Output is generated in `dist/`.

## Run Locally

After building:

```bash
node dist/cosmic.js greet
node dist/cosmic.js add 10 5
node dist/cosmic.js subtract 10 5
node dist/cosmic.js multiply 10 5
node dist/cosmic.js divide 10 5
node dist/cosmic.js hasao
```

## Install as a Global CLI

From this project directory:

```bash
npm link
```

Then run:

```bash
cosmic greet
cosmic add 10 20
cosmic hasao
```

## Notes

- `divide` handles division by zero and prints an error message.
- `hasao` depends on internet connectivity.
