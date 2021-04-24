import fs from 'fs'
import utils from 'util'
import { FileSystemAdapter } from '@vcr/domain'

export class NodeFileSystem implements FileSystemAdapter {
  async exist (folderPath: string) {
    try {
      await utils.promisify(fs.access)(folderPath)
      return true
    } catch (error) {
      return false
    }
  }

  async mkDir (folderPath: string) {
    await utils.promisify(fs.mkdir)(folderPath, { recursive: true })
  }

  readDir (folderPath: string) {
    return utils.promisify(fs.readdir)(folderPath, { withFileTypes: true })
  }

  async rmDir (folderPath: string) {
    await utils.promisify(fs.rmdir)(folderPath, { recursive: true })
  }
}
