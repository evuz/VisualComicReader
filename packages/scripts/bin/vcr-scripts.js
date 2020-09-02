#!/usr/bin/env node
const program = require('commander')

const { version } = require('../package.json')

program
  .version(version, '-v, --version')
  .command(
    'install-dependencies',
    'Install dependencies within generated electron packaged'
  )
  .alias('deps')
  .command(
    'copy-renderer',
    'Copy build generated webapp into the electron folder'
  )
  .alias('copyr')
  .parse(process.argv)
