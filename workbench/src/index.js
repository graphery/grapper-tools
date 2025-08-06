#!/usr/bin/env node

import path        from 'node:path';
import { Command } from 'commander';
import config      from './config.js';
import server      from './server.js';
import log         from "./log.js";
import pkg        from '../package.json' with {type: 'json'};

const program = new Command();

program
  .name('g-workshop')
  .version(pkg.version)
  .option('-l, --label <title>', 'title label')
  .option('-t, --test <cases-folder>', 'folder with cases (.js files)')
  .option('-r, --root <root-folder>', 'root folder served')
  .option('-p, --port <server-port>', 'http server port')
  .option('-i, --import <module...>', 'import module')
  .option('-b, --lib <library...>', 'import library')
  .option('-s, --silence', 'silence mode')
  .action((command) => {
    main({
      label   : command.label || 'case',
      tests   : command.test ? path.resolve(process.cwd(), command.test) : config.test,
      root    : command.root ? path.resolve(process.cwd(), command.root) : config.root,
      port    : command.port ? Number.parseInt(command.port) : config.port,
      lib     : command.lib ?
        command.lib.map(lib =>
          lib.startsWith('http://') || lib.startsWith('https://') ?
            lib :
            path.join((process.cwd().replace(command.root || config.root, '')), lib).replace(/\\/g, '/')) :
        false,
      imp     : command.import ?
        command.import.map(imp =>
          imp.startsWith('http://') || imp.startsWith('https://') ?
            imp :
            path.join((process.cwd().replace(command.root || config.root, '')), imp).replace(/\\/g, '/')) :
        false,
      silence : command.silence || false
    });
  });
program.parse(process.argv);

async function main (options) {
  process.silence = options.silence;
  await server(options);
  if (!process.silence) {
    const url = `http://localhost:${ options.port }/?${ options.imp ?
      options.imp.map(imp => `imp=${ imp }`).join('&') :
      options.lib ? options.lib.map(lib => `&lib=${ lib }`).join('&') : '' }`;
    log(`workbench listen on ${ url }`);
  }
}