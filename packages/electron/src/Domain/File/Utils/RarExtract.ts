import { File } from '@vcr/domain'
import { CreateTmpFolder } from './CreateTmpFolder'
import * as unrar from 'node-unrar-js'

export class RarExtract {
  private folder: string

  constructor(private path: File, private createTmpFolder: CreateTmpFolder) {}

  async run() {
    const { folder, isNew } = await this.createTmpFolder.run(this.path)
    this.folder = folder
    if (isNew) {
      await this.unrar()
    }
    return folder
  }

  async unrar() {
    return new Promise<{ tmpFolder: string }>((resolve) => {
      const extractor = unrar.createExtractorFromFile(this.path, this.folder)
      const extracted = extractor.extractAll()
      if (extracted[0].state === 'SUCCESS') resolve()
    })
  }
}
