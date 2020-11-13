import * as fs from 'fs'
import * as utils from 'util'

export class ReadFolder {
  async execute(folder: string) {
    const stat = await utils.promisify(fs.stat)(folder)
    return stat.isDirectory()
  }
}
