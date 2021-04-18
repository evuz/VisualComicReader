import { app } from 'electron'
import * as path from 'path'
import { IConfig } from '../Config/models/Config'

function getDevelopPath () {
  return {
    app: app.getAppPath(),
    tmp: path.join(app.getAppPath(), '.tmp')
  }
}

export function getPaths (): IConfig['paths'] {
  if (process.env.NODE_ENV === 'development') {
    return getDevelopPath()
  }

  return {
    app: app.getAppPath(),
    tmp: path.join(app.getPath('temp'), app.getName())
  }
}
