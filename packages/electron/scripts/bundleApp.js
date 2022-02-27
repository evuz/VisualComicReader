const esbuild = require('esbuild')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

const { paths } = require('./paths')

const ENTRY_POINT = path.resolve(paths.electron.src, 'index.ts')
const PRELOAD = path.resolve(paths.electron.src, 'preload.ts')
const OUTPATH = paths.electron.dist

exports.bundleApp = async function build ({ silent = false } = {}) {
  const spinner = !silent
    ? ora('Generating the application bundle').start()
    : null
  try {
    const result = await esbuild.build({
      entryPoints: [ENTRY_POINT, PRELOAD],
      outdir: OUTPATH,
      bundle: true,
      platform: 'node',
      target: 'node10.23',
      external: ['electron', 'fsevents']
    })
    spinner && spinner.succeed()
    return result
  } catch (error) {
    spinner && spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
