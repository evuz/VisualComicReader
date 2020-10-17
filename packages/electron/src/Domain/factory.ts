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
import { IConfig } from './Config/models/Config'
import { ElectronScreen } from './Adapters/Screen/ElectronScreen'
import { ElectronScreenRepository } from './Screen/Repositories/ElectronScreenRepository'
import { ToggleFullscreenUsecase } from './Screen/UseCases/ToggleFullscreenUseCase'
import { ToggleFullscreenListener } from './Screen/Listeners/ToggleFullscreenListener'

export function factory(browserWindow: BrowserWindow) {
  // Config
  const config: IConfig = {
    platform: process.platform,
  }

  const adapters = {
    processMain: new ElectronMainProcessComunication(
      ipcMain,
      browserWindow.webContents
    ),
    dialog: new ElectronDialog(browserWindow),
    keysListener: new GlobalShortcut(browserWindow),
    screen: new ElectronScreen(browserWindow),
  }

  const container = createContainer(
    {
      [Symbols.Config]: { asValue: config },
      [Symbols.ProcessMain]: { asValue: adapters.processMain },
      [Symbols.Dialog]: { asValue: adapters.dialog },
      [Symbols.Screen]: { asValue: adapters.screen },
      [Symbols.KeysListener]: { asValue: adapters.keysListener },
      [Symbols.ComicRepository]: { asClass: ElectronComicRepository },
      [Symbols.ShortcutsRepository]: { asClass: ElectronShortcutsRepository },
      [Symbols.ScreenRepository]: { asClass: ElectronScreenRepository },
      [Symbols.ShowInfoShortcutsService]: { asClass: ShowInfoShortcutsService },
      [Symbols.RegisterShortcutsService]: { asClass: RegisterShortcutsService },
      [Symbols.SelectFileListener]: { asClass: SelectFileListener },
      [Symbols.ToggleFullscreenListener]: { asClass: ToggleFullscreenListener },
      [Symbols.ShowInfoShortcutsListener]: {
        asClass: ShowInfoShortcutListener,
      },
      [Symbols.ShowInfoShortcutsUseCase]: { asClass: ShowInfoShortcutsUseCase },
      [Symbols.RegisterShortcutsUseCase]: { asClass: RegisterShortcutsUseCase },
      [Symbols.ToggleFullscreenUseCase]: { asClass: ToggleFullscreenUsecase },
    },
    { lifetime: 'singleton' }
  )

  // Listeners
  const listeners = {
    selectFile: container.get<SelectFileListener>(Symbols.SelectFileListener),
    showInfoShortcuts: container.get<ShowInfoShortcutListener>(
      Symbols.ShowInfoShortcutsListener
    ),
    toggleFullscreen: container.get<ToggleFullscreenListener>(
      Symbols.ToggleFullscreenListener
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
    toggleFullscreen: container.get<ToggleFullscreenUsecase>(
      Symbols.ToggleFullscreenUseCase
    ),
  }

  return new Domain({ useCases, listeners, config })
}
