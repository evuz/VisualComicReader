const { copyRenderer } = require('./copyRenderer')
const { bundleApp } = require('./bundleApp')
const { buildWeb } = require('./buildWeb')
const { copyPackageJson } = require('./copyPackageJson')
const { installDependencies } = require('./installDependencies')
const { make } = require('./make')

async function main () {
  await buildWeb()
  await copyRenderer()
  await bundleApp()
  await copyPackageJson()
  await installDependencies()
  await make()
}

main()
