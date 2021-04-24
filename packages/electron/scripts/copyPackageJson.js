const fs = require('fs')
const utils = require('util')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

const { paths } = require('./paths')
const pkg = require('../package.json')

const fsWriteFile = utils.promisify(fs.writeFile)

const properties = [
  'name',
  'productName',
  'version',
  'description',
  ['main', 'index.js'],
  'author',
  'license',
  ['dependencies', {}],
  ['devDependencies', { electron: pkg.devDependencies.electron }],
  'config'
]

function createPackageJson () {
  return properties.reduce((acc, prop) => {
    const property = Array.isArray(prop) ? prop : [prop, pkg[prop]]

    acc[property[0]] = property[1]
    return acc
  }, {})
}

function writePackageJson (packageJson) {
  return fsWriteFile(
    path.resolve(paths.electron.dist, 'package.json'),
    packageJson
  )
}

exports.copyPackageJson = async function () {
  const spinner = ora('Copying package.json to dist folder').start()

  try {
    const newPkg = createPackageJson()
    await writePackageJson(JSON.stringify(newPkg))
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    console.error(chalk.bold.red(error))
    process.exit(1)
  }
}
