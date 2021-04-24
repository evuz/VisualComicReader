const { api } = require('@electron-forge/core')
const chokidar = require('chokidar')
const ora = require('ora')

const { bundleApp } = require('./bundleApp')
const { paths } = require('./paths')

async function runApp () {
  return api.start({ dir: paths.electron.root })
}

process.env.NODE_ENV = 'development'

function exit () {
  process.exit(0)
}

async function main () {
  const spinner = ora()
  let electronProcess = null

  async function run (message) {
    spinner.start(message)

    await bundleApp({ silent: true })
    electronProcess = await runApp()

    electronProcess.addListener('close', exit)
    spinner.succeed()
  }

  await run('Launching app')
  chokidar.watch(paths.electron.src).on('change', async () => {
    if (!electronProcess) {
      return
    }

    electronProcess.off('close', exit)
    electronProcess.kill()
    electronProcess = null

    run('Relaunching app')
  })
}

main()
