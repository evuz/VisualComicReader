import { ipcMain } from 'electron'
import { Domain, electronProcessMain } from '@vcr/domain'

import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { SelectFileListener } from './Comic/Listeners/SelectFileListener'
import { ShowInfoShortcutListener } from './Shortcuts/Listeners/ShowInfoShortcutListener'
import { ElectronShortcutsRepository } from './Shortcuts/Repositories/ElectronShortcutsRepository'
import { ElectronDialog } from './Adapters/Dialog/ElectronDialog'
import { ShowInfoShortcutUseCase } from './Shortcuts/UseCase/ShowInfoShortcutUseCase'
import { ShowInfoShortcutService } from './Shortcuts/Services/ShowInfoShortcustService'

export function factory() {
  // Config
  const config = {
    platform: process.platform,
  }

  // Adapters
  const processMain = electronProcessMain(ipcMain)
  const dialog = new ElectronDialog()

  // Repositories
  const repositories = {
    comic: new ElectronComicRepository(processMain),
    shortcuts: new ElectronShortcutsRepository(processMain, dialog, config),
  }

  // Services
  const services = {
    showInfoShortcuts: new ShowInfoShortcutService(repositories.shortcuts),
  }

  // Listeners
  const listeners = {
    selectFile: new SelectFileListener(repositories.comic),
    showInfoShortcuts: new ShowInfoShortcutListener(repositories.shortcuts),
  }

  // UseCases
  const useCases = {
    showInfoShortcuts: new ShowInfoShortcutUseCase(services.showInfoShortcuts),
  }

  return new Domain({ useCases, listeners, config })
}
