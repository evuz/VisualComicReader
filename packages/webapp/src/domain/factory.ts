import { Domain, ElectronProcessMain } from '@vcr/domain'

import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { SelectComicService } from './Comic/Services/SelectComicService'
import { SelectComicUseCase } from './Comic/UseCases/SelectComicUseCase'
import { ElectronScreenRepository } from './Screen/Repositories/ElectronScreenRepository'
import { ToggleFullscrenUseCase } from './Screen/UseCases/ToggleFullscreenUseCase'
import { RegisterShortcutListener } from './Shortcuts/Listeners/RegisterShortcutListener'
import { ElectronShortcutRepository } from './Shortcuts/Repositories/ElectronShortcutRepository'

export function factory() {
  const ipc = window.require ? window.require('electron').ipcRenderer : null

  const adapters = {
    processMain: new ElectronProcessMain(ipc),
  }

  const repositories = {
    comic: new ElectronComicRepository(adapters.processMain),
    shortcuts: new ElectronShortcutRepository(adapters.processMain),
    screen: new ElectronScreenRepository(adapters.processMain),
  }

  const services = {
    selectComic: new SelectComicService(repositories.comic),
  }

  const listeners = {
    registerShortcut: new RegisterShortcutListener(repositories.shortcuts),
  }

  const useCases = {
    selectComic: new SelectComicUseCase(services.selectComic),
    toggleFullscreen: new ToggleFullscrenUseCase(repositories.screen),
  }

  return new Domain({ useCases, listeners })
}
