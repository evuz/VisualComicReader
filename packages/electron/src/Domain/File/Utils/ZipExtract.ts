import { File } from '@vcr/domain'
import { CreateTmpFolder } from './CreateTmpFolder'
import * as unzip from 'extract-zip'

export class ZipExtract {
  constructor(private path: File, private createTmpFolder: CreateTmpFolder) {}

  async run() {
    const { folder, isNew } = await this.createTmpFolder.run(this.path)
    if (isNew) {
      await unzip(this.path, { dir: folder })
    }
    return folder
  }
}
