import { Service } from '@vcr/domain'

import { UpdateSettingsService } from '../../Settings/Services/UpdateSettingsService'
import { LibraryRepository } from '../Repositories/LibraryRepository'

export class SelectLibraryService implements Service {
  constructor (
    private libraryRepository: LibraryRepository,
    private updateSettings: UpdateSettingsService
  ) {}

  async execute () {
    const directory = await this.libraryRepository.selectLibrary()
    if (!directory) {
      return
    }

    await this.updateSettings.execute({ libraryPath: directory })
    return directory
  }
}
