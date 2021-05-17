const { copyRenderer } = require('./copyRenderer')
const { bundleApp } = require('./bundleApp')
const { buildWeb } = require('./buildWeb')
const { copyPackageJson } = require('./copyPackageJson')
const { installDependencies } = require('./installDependencies')
const { make } = require('./make')
const { copyAssets } = require('./copyAssets')
const { rmDist } = require('./rmDist')

async function main () {
  await rmDist()
  await buildWeb()
  await copyRenderer()
  await bundleApp()
  await copyAssets()
  await copyPackageJson()
  await installDependencies()
  await make()
}

main()
