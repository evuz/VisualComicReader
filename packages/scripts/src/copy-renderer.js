/* eslint-disable no-console */
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const utils = require('util')
const ora = require('ora')
const chalk = require('chalk')

const paths = require('./paths')

const DIST_FOLDER = 'build'
const RENDERER_FOLDER = 'renderer'

const DIST_PATH = path.resolve(__dirname, paths.webapp, DIST_FOLDER)
const RENDERER_PATH = path.resolve(__dirname, paths.electron, RENDERER_FOLDER)

module.exports = async function copyRenderer() {
  const spinner = ora('Copying..').start()

  try {
    await utils.promisify(fs.stat)(DIST_PATH)

    await fse.remove(RENDERER_PATH)
    await fse.copy(DIST_PATH, RENDERER_PATH)
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
