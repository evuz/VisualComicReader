import { Service } from '@vcr/domain'

import { UpdateConfigurationService } from '../../Configuration/Services/UpdateConfigurationService'
import { LibraryRepository } from '../Repositories/LibraryRepository'

export class SelectLibraryService implements Service {
  constructor (private libraryRepository: LibraryRepository, private updateConfiguration: UpdateConfigurationService) {}

  async execute () {
    const directory = await this.libraryRepository.selectLibrary()
    if (!directory) {
      return
    }

    await this.updateConfiguration.execute({ libraryPath: directory })
    return directory
  }
}
