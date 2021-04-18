import * as fs from 'fs'
import * as utils from 'util'

export class ReadFolder {
  execute (folder: string) {
    return utils.promisify(fs.readdir)(folder, { withFileTypes: true })
  }
}
