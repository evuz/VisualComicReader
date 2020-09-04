import { app } from 'electron'
import { getCleanedString, removeExtension } from './cleanString'
import * as fs from 'fs'
import * as path from 'path'

let currentDirectory: string

export function readDirectory(dir: string, cb: any) {
  fs.readdir(dir, cb)
}

export function setCurrentDirectory(directory: string) {
  currentDirectory = path.parse(directory).dir
}

export function getCurrentDirectory() {
  return currentDirectory
}

export function removeTmpFolder() {
  const tmpPath = path.join(app.getPath('temp'), 'VisualComicReader')
  deleteFolderRecursive(tmpPath)
}

function deleteFolderRecursive(pathFolder: string) {
  if (fs.existsSync(pathFolder)) {
    fs.readdirSync(pathFolder).forEach((file) => {
      const curPath = `${pathFolder}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(pathFolder)
  }
}

export function createTmpFolder(file?: string) {
  const tmpPath =
    process.env.NODE_ENV === 'development'
      ? path.join(path.resolve(__dirname), '..', '..')
      : app.getPath('temp')
  const tmpFolder =
    process.env.NODE_ENV === 'development' ? '.tmp' : 'VisualComicReader'

  const folder = file
    ? path.join(tmpPath, tmpFolder, getCleanedString(removeExtension(file)))
    : path.join(tmpPath, tmpFolder)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  } else {
    deleteFolderRecursive(folder)
    createTmpFolder(file)
  }

  return folder
}
