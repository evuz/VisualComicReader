const path = require('path')

const packagesPath = path.resolve(__dirname, '..', '..')
const electronPath = path.resolve(packagesPath, 'electron')
const webappPath = path.resolve(packagesPath, 'webapp')

const paths = {
  packages: packagesPath,
  electron: {
    root: electronPath,
    dist: path.resolve(electronPath, 'dist'),
    src: path.resolve(electronPath, 'src'),
  },
  webapp: {
    root: webappPath,
    dist: path.resolve(webappPath, 'build'),
    src: path.resolve(webappPath, 'src'),
  },
}

exports.paths = paths
