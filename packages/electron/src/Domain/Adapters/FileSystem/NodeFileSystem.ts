import fs from 'fs'
import utils from 'util'
import path from 'path'
import { FileSystemAdapter } from '@vcr/domain'
import { Exceptions } from '../../Utils/Exceptions'

export class NodeFileSystem implements FileSystemAdapter {
  async exist (path: string) {
    try {
      await utils.promisify(fs.access)(path)
      return true
    } catch (error) {
      return false
    }
  }

  async mkDir (folderPath: string) {
    await utils.promisify(fs.mkdir)(folderPath, { recursive: true })
  }

  async writeJson (filePath: string, data: Object) {
    const { dir } = path.parse(filePath)
    const exist = await this.exist(dir)

    if (!exist) {
      await this.mkDir(dir)
    }

    await utils.promisify(fs.writeFile)(filePath, JSON.stringify(data))
  }

  readDir (folderPath: string) {
    return utils.promisify(fs.readdir)(folderPath, { withFileTypes: true })
  }

  async rmDir (folderPath: string) {
    await utils.promisify(fs.rmdir)(folderPath, { recursive: true })
  }

  async readJson (filePath: string) {
    const exist = this.exist(filePath)
    if (!exist) {
      throw Error(Exceptions.FileNotFound)
    }

    try {
      const data = await utils.promisify(fs.readFile)(filePath, 'utf-8')
      return JSON.parse(data)
    } catch (e) {
      throw Error(Exceptions.Unknown)
    }
  }
}
