import { Domain, ElectronProcessMain } from '@vcr/domain'

import { ElectronFileManager } from './Adapters/FileManager/ElectronFileManager'
import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { OpenComicService } from './Comic/Services/OpenComicService'
import { SelectComicService } from './Comic/Services/SelectComicService'
import { SelectComicUseCase } from './Comic/UseCases/SelectComicUseCase'
import { ElectronConfigurationRepository } from './Configuration/Repositories/ElectronConfigurationRepository'
import { UpdateConfigurationService } from './Configuration/Services/UpdateConfigurationService'
import { LibraryListener } from './Library/Listeners/LibraryListener'
import { ElectronLibraryRepository } from './Library/Repositories/ElectronLibraryRepository'
import { SelectLibraryService } from './Library/Services/SelectLibraryService'
import { SelectLibraryUseCase } from './Library/UseCases/SelectLibraryUseCase'
import { FetchingListener } from './Screen/Listeners/FetchingListener'
import { ElectronScreenRepository } from './Screen/Repositories/ElectronScreenRepository'
import { ToggleFullscrenUseCase } from './Screen/UseCases/ToggleFullscreenUseCase'
import { RegisterShortcutListener } from './Shortcuts/Listeners/RegisterShortcutListener'
import { BrowserShortcutRepository } from './Shortcuts/Repositories/BrowserShortcutRepository'

export function factory () {
  const ipc = (<any>window).require ? (<any>window).require('electron').ipcRenderer : null

  const processMain = new ElectronProcessMain(ipc)

  const adapters = {
    processMain,
    fileManager: new ElectronFileManager(processMain)
  }

  const repositories = {
    comic: new ElectronComicRepository(adapters.fileManager),
    library: new ElectronLibraryRepository(adapters.fileManager, processMain),
    shortcuts: BrowserShortcutRepository.factory(adapters.processMain),
    screen: new ElectronScreenRepository(adapters.processMain),
    configuration: new ElectronConfigurationRepository(processMain)
  }

  const openComicSrv = new OpenComicService(repositories.comic)
  const updateConfigurationSrv = new UpdateConfigurationService(repositories.configuration)

  const services = {
    openComic: openComicSrv,
    selectComic: new SelectComicService(repositories.comic, openComicSrv),
    selectLibrary: new SelectLibraryService(repositories.library, updateConfigurationSrv)
  }

  const listeners = {
    registerShortcut: new RegisterShortcutListener(repositories.shortcuts),
    library: new LibraryListener(repositories.library),
    fetching: new FetchingListener(repositories.screen)
  }

  const useCases = {
    selectComic: new SelectComicUseCase(services.selectComic),
    selectLibrary: new SelectLibraryUseCase(services.selectLibrary),
    toggleFullscreen: new ToggleFullscrenUseCase(repositories.screen)
  }

  return new Domain({ useCases, listeners })
}
