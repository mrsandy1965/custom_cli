# Cosmic CLI

A simple Node.js CLI built with TypeScript, [commander](https://www.npmjs.com/package/commander), [axios](https://www.npmjs.com/package/axios), and [chalk](https://www.npmjs.com/package/chalk).

## Features

- Colored terminal output via `chalk`
- Input validation with helpful error messages
- `--version` / `-v` flag support
- 10 commands spanning math, APIs, and utilities

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
node dist/cosmic.js <command>
```

## Install as a Global CLI

```bash
npm link
```

Then run commands directly:

```bash
cosmic <command>
```

## Available Commands

| Command | Description |
|---|---|
| `greet [name]` | Greet a user by name |
| `add <num1> <num2>` | Add two numbers |
| `subtract <num1> <num2>` | Subtract second number from first |
| `multiply <num1> <num2>` | Multiply two numbers |
| `divide <num1> <num2>` | Divide first number by second |
| `hasao` | Fetch a random joke from the internet |
| `github <username>` | Fetch GitHub user info |
| `quote` | Fetch a random inspirational quote |
| `coinflip` | Flip a coin — heads or tails? |
| `roll [sides]` | Roll a dice (default: 6 sides) |
| `fileinfo <filename>` | Show file size, path, and extension |

## Example Usage

```bash
cosmic greet Sandesh
cosmic add 10 5
cosmic divide 20 4
cosmic hasao
cosmic github octocat
cosmic quote
cosmic coinflip
cosmic roll 20
cosmic fileinfo package.json
```

## Notes

- `divide` handles division by zero and prints an error message.
- `hasao` and `github` and `quote` depend on internet connectivity.
- `roll` defaults to a 6-sided die if no argument is given.

