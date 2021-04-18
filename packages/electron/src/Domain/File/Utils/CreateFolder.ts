import * as fs from 'fs'
import * as utils from 'util'

export interface ICreateFolder {
  execute(path: string): Promise<void>
}

export class CreateFolder implements ICreateFolder {
  async execute (folderPath: string) {
    const exist = await this.exist(folderPath)
    if (exist) {
      throw Error('Folder already exist')
    }

    await utils.promisify(fs.mkdir)(folderPath, { recursive: true })
  }

  private async exist (folderPath: string) {
    try {
      await utils.promisify(fs.access)(folderPath)
      return true
    } catch (error) {
      return false
    }
  }
}
