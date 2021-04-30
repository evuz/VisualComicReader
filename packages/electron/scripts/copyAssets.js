
const path = require('path')
const ora = require('ora')
const fse = require('fs-extra')
const chalk = require('chalk')

const { paths } = require('./paths')

async function copy (asset) {
  const src = path.resolve(paths.electron.root, asset)
  const dest = path.resolve(paths.electron.dist, asset)
  return fse.copy(src, dest)
}

exports.copyAssets = async function copyAssets ({ silent = false } = {}) {
  const spinner = !silent
    ? ora('Copying assets').start()
    : null
  try {
    await copy('icons')
    await copy('bin')
    spinner && spinner.succeed()
  } catch (error) {
    spinner && spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
