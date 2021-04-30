const esbuild = require('esbuild')
const path = require('path')
const ora = require('ora')
const fse = require('fs-extra')
const chalk = require('chalk')

const { paths } = require('./paths')

const ENTRY_POINT = path.resolve(paths.electron.src, 'index.ts')
const OUTPATH = paths.electron.dist
const OUTFILE = path.join(OUTPATH, 'index.js')

async function copyIcons () {
  const src = path.resolve(paths.electron.root, 'icons')
  const dest = path.resolve(paths.electron.dist, 'icons')
  return fse.copy(src, dest)
}

exports.bundleApp = async function build ({ silent = false } = {}) {
  const spinner = !silent
    ? ora('Generating the application bundle').start()
    : null
  try {
    const result = await esbuild.build({
      entryPoints: [ENTRY_POINT],
      outfile: OUTFILE,
      bundle: true,
      platform: 'node',
      target: 'node10.23',
      external: ['electron', 'fsevents']
    })
    await copyIcons()
    spinner && spinner.succeed()
    return result
  } catch (error) {
    spinner && spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
