#!/usr/bin/env node

const { Command } = require('commander');
const switchEnv = require('../src/commands/switch');
const validateEnv = require('../src/commands/validate');
const checkUnused = require('../src/commands/check-unused');

const program = new Command();

program
  .version('1.0.0')
  .description('Env Manager CLI');

program
  .command('switch <env>')
  .description('Switch to a different environment')
  .action(switchEnv);

program
  .command('validate')
  .description('Validate .env file keys')
  .action(validateEnv);

program
  .command('check-unused')
  .description('Check for unused variables in .env')
  .action(checkUnused);

program.parse(process.argv);
