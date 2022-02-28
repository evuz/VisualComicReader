import { Domain, MessagesCommunicationImpl, WindowChannel, WindowMessageChannel } from '@vcr/domain'

import { ElectronFileManager } from './Adapters/FileManager/ElectronFileManager'
import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { OpenComicService } from './Comic/Services/OpenComicService'
import { SelectComicService } from './Comic/Services/SelectComicService'
import { SelectComicUseCase } from './Comic/UseCases/SelectComicUseCase'
import { ElectronSettingsRepository } from './Settings/Repositories/ElectronSettingsRepository'
import { UpdateSettingsService } from './Settings/Services/UpdateSettingsService'
import { LibraryListener } from './Library/Listeners/LibraryListener'
import { ElectronLibraryRepository } from './Library/Repositories/ElectronLibraryRepository'
import { SelectLibraryService } from './Library/Services/SelectLibraryService'
import { SelectLibraryUseCase } from './Library/UseCases/SelectLibraryUseCase'
import { FetchingListener } from './Screen/Listeners/FetchingListener'
import { ElectronScreenRepository } from './Screen/Repositories/ElectronScreenRepository'
import { ToggleFullscrenUseCase } from './Screen/UseCases/ToggleFullscreenUseCase'
import { RegisterShortcutListener } from './Shortcuts/Listeners/RegisterShortcutListener'
import { BrowserShortcutRepository } from './Shortcuts/Repositories/BrowserShortcutRepository'
import { OpenComicUseCase } from './Comic/UseCases/OpenComicUseCase'

export function factory () {
  const messageChannel = new WindowMessageChannel(window, WindowChannel.Renderer)
  const messagesCommunication = new MessagesCommunicationImpl(messageChannel)

  const adapters = {
    messagesCommunication,
    fileManager: new ElectronFileManager(messagesCommunication)
  }

  const repositories = {
    comic: new ElectronComicRepository(adapters.fileManager),
    library: new ElectronLibraryRepository(adapters.fileManager, messagesCommunication),
    shortcuts: BrowserShortcutRepository.factory(adapters.messagesCommunication),
    screen: new ElectronScreenRepository(adapters.messagesCommunication),
    settings: new ElectronSettingsRepository(messagesCommunication)
  }

  const openComicSrv = new OpenComicService(repositories.comic)
  const updateSettingsSrv = new UpdateSettingsService(repositories.settings)

  const services = {
    openComic: openComicSrv,
    selectComic: new SelectComicService(repositories.comic, openComicSrv),
    selectLibrary: new SelectLibraryService(repositories.library, updateSettingsSrv)
  }

  const listeners = {
    registerShortcut: new RegisterShortcutListener(repositories.shortcuts),
    library: new LibraryListener(repositories.library),
    fetching: new FetchingListener(repositories.screen)
  }

  const useCases = {
    openComic: new OpenComicUseCase(services.openComic),
    selectComic: new SelectComicUseCase(services.selectComic),
    selectLibrary: new SelectLibraryUseCase(services.selectLibrary),
    toggleFullscreen: new ToggleFullscrenUseCase(repositories.screen)
  }

  return new Domain({ useCases, listeners })
}
