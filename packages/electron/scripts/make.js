const { api } = require('@electron-forge/core')
// const ora = require('ora')
const chalk = require('chalk')

const { paths } = require('./paths')

exports.make = async function () {
  try {
    await api.make({
      dir: paths.electron.dist,
      interactive: true,
    })
  } catch (error) {
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
