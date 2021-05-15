import { ipcMain, BrowserWindow } from 'electron'
import { createContainer } from 'depsin'
import { Config, Domain, Settings, defaultSettings } from '@vcr/domain'

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
import { Configuration } from './Configuration/Entities/Configuration'
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
import { SelectDirectoryListener } from './File/Listeners/SelectDirectoryListener'
import { SelectDirectoryService } from './File/Services/SelectDirectoryService'
import { SelectDirectoryUseCase } from './File/UseCases/SelectDirectoryUseCase'
import { UpdateSettingsListener } from './Settings/Listeners/UpdateSettingsListener'
import { UpdateSettingsService } from './Settings/Services/UpdateSettingsService'
import { ReadSettingsService } from './Settings/Services/ReadSettingsService'
import { WriteSettingsService } from './Settings/Services/WriteSettingsService'
import { WatchSettingsListener } from './Settings/Listeners/WatchSettingsListener'
import { NodeSettingsRepository } from './Settings/Repositories/NodeSettingsRepository'
import { InitDomain } from './Utils/InitDomain'
import { InitSettingsService } from './Settings/Services/InitSettingsService'
import { NodeLibraryRepository } from './Library/Repositories/NodeLibraryRepository'
import { WatchLibraryService } from './Library/Services/WatchLibraryService'
import { LibrarySettingListener } from './Library/Listeners/LibrarySettingListener'
import { WatchLibraryListener } from './Library/Listeners/WatchLibraryListener'
import { ReadLibraryService } from './Library/Services/ReadLibraryService'

export function factory (browserWindow: BrowserWindow) {
  // Config
  const configuration: Configuration = new Config({
    platform: process.platform,
    paths: getPaths()
  })
  const settings: Settings = new Config(defaultSettings)

  const utils = {
    normalizeAssetSrc: NormalizeAssetSrc
  }

  const filesSystemAdapter = new NodeFileSystem()
  const createFolder = new CreateFolder(filesSystemAdapter)
  const createTmpFolder = new CreateTmpFolder(configuration, createFolder)
  const adapters = {
    processMain: new ElectronMainProcessComunication(
      ipcMain,
      browserWindow.webContents
    ),
    dialog: new ElectronDialog(browserWindow),
    keysListener: GlobalShortcut.factory(browserWindow),
    screen: new ElectronScreen(browserWindow),
    fileManager: DialogFileManager.factory(new OpenFileFactory(configuration, createTmpFolder))
  }

  if (process.env.NODE_ENV === 'development') {
    utils.normalizeAssetSrc = DevNormalizeAssetSrc
  }

  const container = createContainer(
    {
      [Symbols.Config]: { asValue: configuration },
      [Symbols.Settings]: { asValue: settings },
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
      [Symbols.SettingsRepository]: { asClass: NodeSettingsRepository },
      [Symbols.LibraryRepository]: { asClass: NodeLibraryRepository },
      // Services
      [Symbols.ShowInfoShortcutsService]: { asClass: ShowInfoShortcutsService },
      [Symbols.RegisterShortcutsService]: { asClass: RegisterShortcutsService },
      [Symbols.SelectFileService]: { asClass: SelectFileService },
      [Symbols.SelectDirectoryService]: { asClass: SelectDirectoryService },
      [Symbols.UpdateSettingsService]: { asClass: UpdateSettingsService },
      [Symbols.OpenComicService]: { asClass: OpenComicService },
      [Symbols.ReadSettingsService]: { asClass: ReadSettingsService },
      [Symbols.WriteSettingsService]: { asClass: WriteSettingsService },
      [Symbols.InitSettingsService]: { asClass: InitSettingsService },
      [Symbols.WatchLibraryService]: { asClass: WatchLibraryService },
      [Symbols.ReadLibraryService]: { asClass: ReadLibraryService },
      // Listeners
      [Symbols.OpenFileListener]: { asClass: OpenFileListener },
      [Symbols.SelectFileListener]: { asClass: SelectFileListener },
      [Symbols.SelectDirectoryListener]: { asClass: SelectDirectoryListener },
      [Symbols.UpdateSettingsListener]: { asClass: UpdateSettingsListener },
      [Symbols.WatchSettingsListener]: { asClass: WatchSettingsListener },
      [Symbols.ToggleFullscreenListener]: { asClass: ToggleFullscreenListener },
      [Symbols.ShowInfoShortcutsListener]: {
        asClass: ShowInfoShortcutListener
      },
      [Symbols.LibrarySettingListener]: { asClass: LibrarySettingListener },
      [Symbols.WatchLibraryListener]: { asClass: WatchLibraryListener },
      // Use cases
      [Symbols.ShowInfoShortcutsUseCase]: { asClass: ShowInfoShortcutsUseCase },
      [Symbols.RegisterShortcutsUseCase]: { asClass: RegisterShortcutsUseCase },
      [Symbols.ToggleFullscreenUseCase]: { asClass: ToggleFullscreenUsecase },
      [Symbols.SelectFileUseCase]: { asClass: SelectFileUseCase },
      [Symbols.SelectDirectoryUseCase]: { asClass: SelectDirectoryUseCase },
      [Symbols.OpenComicUseCase]: { asClass: OpenComicUseCase },
      [Symbols.ClearTmpFolderUseCase]: { asClass: ClearTmpFolder },
      // Utils
      [Symbols.Init]: { asClass: InitDomain },
      [Symbols.RemoveFolder]: { asClass: RemoveFolder },
      [Symbols.ReadFolder]: { asClass: ReadFolder },
      [Symbols.NormalizeAssetSrc]: { asClass: utils.normalizeAssetSrc }
    },
    { lifetime: 'singleton' }
  )

  // Listeners
  const listeners = {
    selectFile: container.get<SelectFileListener>(Symbols.SelectFileListener),
    selectDirectory: container.get<SelectDirectoryListener>(Symbols.SelectDirectoryListener),
    showInfoShortcuts: container.get<ShowInfoShortcutListener>(
      Symbols.ShowInfoShortcutsListener
    ),
    openFile: container.get<OpenFileListener>(Symbols.OpenFileListener),
    updateSettings: container.get<UpdateSettingsListener>(Symbols.UpdateSettingsListener),
    watchSettings: container.get<WatchSettingsListener>(Symbols.WatchSettingsListener),
    toggleFullscreen: container.get<ToggleFullscreenListener>(
      Symbols.ToggleFullscreenListener
    )
  }

  // UseCases
  const useCases = {
    init: container.get<InitDomain>(Symbols.Init)
  }

  return new Domain({ useCases, listeners, config: configuration })
}
