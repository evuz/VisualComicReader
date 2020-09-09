import { ipcMain } from 'electron'
import { Domain, electronProcessMain } from '@vcr/domain'

import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { SelectFileListener } from './Comic/Listeners/SelectFileListener'

export function factory() {
  const adapters = {
    processMain: electronProcessMain(ipcMain),
  }

  const repositories = {
    comic: new ElectronComicRepository(adapters.processMain),
  }

  const useCases = {
    selectFile: new SelectFileListener(repositories.comic),
  }

  return new Domain({ useCases })
}
