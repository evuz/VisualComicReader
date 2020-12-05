import {
  Comic,
  FileManagerAdapter,
  IpcMessages,
  ProcessMainAdapter,
  Service,
} from '@vcr/domain'
import * as path from 'path'
import { DEPS_SYMBOL } from 'depsin'

import { ReadFolder } from '../../File/Utils/ReadFolder'
import { Symbols } from '../../symbols'
import { NormalizeAssetSrc } from '../../File/Utils/NormalizeAssetSrc'

const imgExtensions = ['.jpg', '.png', '.jpeg']

export class OpenComicService implements Service {
  static [DEPS_SYMBOL] = [
    Symbols.FileManager,
    Symbols.ProcessMain,
    Symbols.ReadFolder,
    Symbols.NormalizeAssetSrc,
  ]

  constructor(
    private fileManager: FileManagerAdapter,
    private processMain: ProcessMainAdapter,
    private readFolder: ReadFolder,
    private normalizeSrc: NormalizeAssetSrc
  ) {}

  async execute(comicPath: string): Promise<Comic> {
    this.processMain.emit(IpcMessages.Fetching, { payload: true })

    const folder = await this.fileManager.openFile(comicPath)
    const images = await this.getImages(folder)

    this.processMain.emit(IpcMessages.Fetching, { payload: false })

    return new Comic({
      images: images.map(this.normalizeSrc.execute),
      name: this.getComicName(comicPath),
      pages: images.length,
    })
  }

  private async getImages(folder: string): Promise<string[]> {
    const files = await this.readFolder.execute(folder)
    const images = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folder, file.name)
        if (file.isDirectory()) {
          return this.getImages(filePath)
        }

        if (!imgExtensions.includes(path.extname(file.name).toLowerCase())) {
          return null
        }

        return filePath
      })
    )

    return images.reduce((acc, image) => {
      if (!image) {
        return acc
      }
      return acc.concat(<string>image)
    }, []) as string[]
  }

  private getComicName(selection: string) {
    const { name } = path.parse(selection)
    return name
  }
}
