import * as fs from 'fs'
import * as utils from 'util'

export class RemoveFolder {
  execute(folder: string) {
    return utils.promisify(fs.rmdir)(folder, { recursive: true })
  }
}
