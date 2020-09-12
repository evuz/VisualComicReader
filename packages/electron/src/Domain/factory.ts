import { ipcMain, BrowserWindow } from 'electron'
import { createContainer } from 'depsin'
import { Domain } from '@vcr/domain'

import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { SelectFileListener } from './Comic/Listeners/SelectFileListener'
import { ShowInfoShortcutListener } from './Shortcuts/Listeners/ShowInfoShortcutListener'
import { ElectronShortcutsRepository } from './Shortcuts/Repositories/ElectronShortcutsRepository'
import { ElectronDialog } from './Adapters/Dialog/ElectronDialog'
import { ShowInfoShortcutsUseCase } from './Shortcuts/UseCase/ShowInfoShortcutsUseCase'
import { ShowInfoShortcutsService } from './Shortcuts/Services/ShowInfoShortcutsService'
import { Symbols } from './symbols'
import { GlobalShortcut } from './Adapters/KeysListener/GlobalShortcut'
import { RegisterShortcutsService } from './Shortcuts/Services/RegisterShortcutsService'
import { RegisterShortcutsUseCase } from './Shortcuts/UseCase/RegisterShortcutsUseCase'
import { ElectronMainProcessComunication } from './Adapters/ProcessComunication/ElectronMainProcessComunication'

export function factory(browserWindow: BrowserWindow) {
  // Config
  const config = {
    platform: process.platform,
  }

  const adapters = {
    processMain: new ElectronMainProcessComunication(
      ipcMain,
      browserWindow.webContents
    ),
    dialog: new ElectronDialog(),
    keysListener: new GlobalShortcut(browserWindow),
  }

  const container = createContainer(
    {
      [Symbols.Config]: { asValue: config },
      [Symbols.ProcessMain]: { asValue: adapters.processMain },
      [Symbols.Dialog]: { asValue: adapters.dialog },
      [Symbols.KeysListener]: { asValue: adapters.keysListener },
      [Symbols.ComicRepository]: { asClass: ElectronComicRepository },
      [Symbols.ShortcutsRepository]: { asClass: ElectronShortcutsRepository },
      [Symbols.ShowInfoShortcutsService]: { asClass: ShowInfoShortcutsService },
      [Symbols.RegisterShortcutsService]: { asClass: RegisterShortcutsService },
      [Symbols.SelectFileListener]: { asClass: SelectFileListener },
      [Symbols.ShowInfoShortcutsListener]: {
        asClass: ShowInfoShortcutListener,
      },
      [Symbols.ShowInfoShortcutsUseCase]: { asClass: ShowInfoShortcutsUseCase },
      [Symbols.RegisterShortcutsUseCase]: { asClass: RegisterShortcutsUseCase },
    },
    { lifetime: 'singleton' }
  )

  // Listeners
  const listeners = {
    selectFile: container.get<SelectFileListener>(Symbols.SelectFileListener),
    showInfoShortcuts: container.get<ShowInfoShortcutListener>(
      Symbols.ShowInfoShortcutsListener
    ),
  }

  // UseCases
  const useCases = {
    showInfoShortcuts: container.get<ShowInfoShortcutsUseCase>(
      Symbols.ShowInfoShortcutsUseCase
    ),
    registerShortcuts: container.get<RegisterShortcutsUseCase>(
      Symbols.RegisterShortcutsUseCase
    ),
  }

  return new Domain({ useCases, listeners, config })
}
