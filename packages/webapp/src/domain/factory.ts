import { Domain, ElectronProcessMain } from '@vcr/domain'

import { ElectronComicRepository } from './Comic/Repositories/ElectronComicRepository'
import { SelectComicService } from './Comic/Services/SelectComicService'
import { SelectComicUseCase } from './Comic/UseCases/SelectComicUseCase'

export function factory() {
  const ipc = window.require ? window.require('electron').ipcRenderer : null

  const adapters = {
    processMain: new ElectronProcessMain(ipc),
  }
  const repositories = {
    comic: new ElectronComicRepository(adapters.processMain),
  }

  const services = {
    selectComic: new SelectComicService(repositories.comic),
  }

  const useCases = {
    selectComic: new SelectComicUseCase(services.selectComic),
  }

  return new Domain({ useCases })
}
