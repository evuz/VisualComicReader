import { app } from 'electron'
import * as path from 'path'
import { IConfiguration } from '../Configuration/Entities/Configuration'

function getDevelopPath () {
  return {
    app: app.getAppPath(),
    config: path.join(app.getAppPath(), '.tmp', 'config.json'),
    tmp: path.join(app.getAppPath(), '.tmp')
  }
}

export function getPaths (): IConfiguration['paths'] {
  if (process.env.NODE_ENV === 'development') {
    return getDevelopPath()
  }

  return {
    app: app.getAppPath(),
    config: path.join(app.getAppPath(), 'config.json'),
    tmp: path.join(app.getPath('temp'), app.getName())
  }
}
