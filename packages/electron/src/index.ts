import { app as electonApp } from 'electron'
import { appFactory } from './App/factory'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  electonApp.quit()
}

appFactory(electonApp)
