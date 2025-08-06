#!/usr/bin/env node

const pack                   = require ('./pack.js');
const commander              = require ('commander');
const pkg                    = require ('./package.json');
const program                = new commander.Command ();

program
  .name ('Grapper Packer')
  .version (pkg.version)
  .command ('build <from> <to> [parckage.json]', {isDefault : true})
  .option ('-l, --label <label>', 'label for the bundle')
  .option ('-m, --module', 'build a ES module')
  .option ('-e, --exclude <module...>', 'exclude module from the bundle')
  .option ('-x, --map', 'build .map file')
  .action (pack);

program.parse(process.argv);

