import { ipcMain, BrowserWindow } from 'electron'
import { createContainer } from 'depsin'
import { Domain } from '@vcr/domain'

import { SelectFileListener } from './File/Listeners/SelectFileListener'
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
import { DialogFileManager } from './Adapters/FileManager/DialogFileManager'
import { OpenFileListener } from './File/Listeners/OpenFileListener'
import { SelectFileUseCase } from './File/UseCases/SelectFileUseCase'
import { OpenComicUseCase } from './Comic/UseCases/OpenComicUseCase'
import { SelectFileService } from './File/Services/SelectFileService'
import { OpenComicService } from './Comic/Services/OpenComicService'
import { OpenFileFactory } from './File/Factories/OpenFileFactory'
import { getPaths } from './Utils/getPaths'
import { ClearTmpFolder } from './File/UseCases/ClearTmpFolder'
import { RemoveFolder } from './File/Utils/RemoveFolder'
import { ReadFolder } from './File/Utils/ReadFolder'
import {
  DevNormalizeAssetSrc,
  NormalizeAssetSrc
} from './File/Utils/NormalizeAssetSrc'
import { NodeFileSystem } from './Adapters/FileSystem/NodeFileSystem'
import { CreateTmpFolder } from './File/Utils/CreateTmpFolder'
import { CreateFolder } from './File/Utils/CreateFolder'

export function factory (browserWindow: BrowserWindow) {
  // Config
  const config: IConfig = {
    platform: process.platform,
    paths: getPaths()
  }

  const utils = {
    normalizeAssetSrc: NormalizeAssetSrc
  }

  const filesSystemAdapter = new NodeFileSystem()
  const createFolder = new CreateFolder(filesSystemAdapter)
  const createTmpFolder = new CreateTmpFolder(config, createFolder)
  const adapters = {
    processMain: new ElectronMainProcessComunication(
      ipcMain,
      browserWindow.webContents
    ),
    dialog: new ElectronDialog(browserWindow),
    keysListener: GlobalShortcut.factory(browserWindow),
    screen: new ElectronScreen(browserWindow),
    fileManager: DialogFileManager.factory(new OpenFileFactory(config, createTmpFolder))
  }

  if (process.env.NODE_ENV === 'development') {
    utils.normalizeAssetSrc = DevNormalizeAssetSrc
  }

  const container = createContainer(
    {
      [Symbols.Config]: { asValue: config },
      // Adapters
      [Symbols.ProcessMain]: { asValue: adapters.processMain },
      [Symbols.Dialog]: { asValue: adapters.dialog },
      [Symbols.Screen]: { asValue: adapters.screen },
      [Symbols.KeysListener]: { asValue: adapters.keysListener },
      [Symbols.FileManager]: { asValue: adapters.fileManager },
      [Symbols.FileSystem]: { asValue: filesSystemAdapter },
      // Repositories
      [Symbols.ShortcutsRepository]: { asClass: ElectronShortcutsRepository },
      [Symbols.ScreenRepository]: { asClass: ElectronScreenRepository },
      // Services
      [Symbols.ShowInfoShortcutsService]: { asClass: ShowInfoShortcutsService },
      [Symbols.RegisterShortcutsService]: { asClass: RegisterShortcutsService },
      [Symbols.SelectFileService]: { asClass: SelectFileService },
      [Symbols.OpenComicService]: { asClass: OpenComicService },
      // Listeners
      [Symbols.OpenFileListener]: { asClass: OpenFileListener },
      [Symbols.SelectFileListener]: { asClass: SelectFileListener },
      [Symbols.ToggleFullscreenListener]: { asClass: ToggleFullscreenListener },
      [Symbols.ShowInfoShortcutsListener]: {
        asClass: ShowInfoShortcutListener
      },
      // Use cases
      [Symbols.ShowInfoShortcutsUseCase]: { asClass: ShowInfoShortcutsUseCase },
      [Symbols.RegisterShortcutsUseCase]: { asClass: RegisterShortcutsUseCase },
      [Symbols.ToggleFullscreenUseCase]: { asClass: ToggleFullscreenUsecase },
      [Symbols.SelectFileUseCase]: { asClass: SelectFileUseCase },
      [Symbols.OpenComicUseCase]: { asClass: OpenComicUseCase },
      [Symbols.ClearTmpFolder]: { asClass: ClearTmpFolder },
      // Utils
      [Symbols.RemoveFolder]: { asClass: RemoveFolder },
      [Symbols.ReadFolder]: { asClass: ReadFolder },
      [Symbols.NormalizeAssetSrc]: { asClass: utils.normalizeAssetSrc }
    },
    { lifetime: 'singleton' }
  )

  // Listeners
  const listeners = {
    selectFile: container.get<SelectFileListener>(Symbols.SelectFileListener),
    showInfoShortcuts: container.get<ShowInfoShortcutListener>(
      Symbols.ShowInfoShortcutsListener
    ),
    openFile: container.get<OpenFileListener>(Symbols.OpenFileListener),
    toggleFullscreen: container.get<ToggleFullscreenListener>(
      Symbols.ToggleFullscreenListener
    )
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
    selectFile: container.get<SelectFileUseCase>(Symbols.SelectFileUseCase),
    openComic: container.get<OpenComicUseCase>(Symbols.OpenComicUseCase),
    clearTmpFolder: container.get<ClearTmpFolder>(Symbols.ClearTmpFolder)
  }

  return new Domain({ useCases, listeners, config })
}
