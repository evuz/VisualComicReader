const { exec: e } = require('child_process')
const utils = require('util')
const ora = require('ora')
const chalk = require('chalk')

const { paths } = require('./paths')

const exec = utils.promisify(e)

exports.installDependencies = async function () {
  const spinner = ora('Installing dependencies').start()

  try {
    await exec('npm install', { cwd: paths.electron.dist })
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
