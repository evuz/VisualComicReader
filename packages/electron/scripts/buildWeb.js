const { exec: e } = require('child_process')
const utils = require('util')
const ora = require('ora')
const chalk = require('chalk')

const { paths } = require('./paths')

const exec = utils.promisify(e)

exports.buildWeb = async function () {
  const spinner = ora('Building webapp').start()

  try {
    await exec('npm run build', { cwd: paths.webapp.root })
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
