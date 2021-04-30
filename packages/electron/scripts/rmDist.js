const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')
const utils = require('util')

const { paths } = require('./paths')

exports.rmDist = async function rmDir ({ silent = false } = {}) {
  const spinner = !silent
    ? ora('Remove previous build').start()
    : null
  try {
    await utils.promisify(fs.rmdir)(paths.electron.dist, { recursive: true })
    spinner && spinner.succeed()
  } catch (error) {
    spinner && spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
