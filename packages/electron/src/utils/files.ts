import { dialog, BrowserWindow } from 'electron'

import * as fs from 'fs'
import * as path from 'path'

import * as cbz from 'extract-zip'
import * as unrar from 'node-unrar-js'

import {
  readDirectory,
  createTmpFolder,
  setCurrentDirectory,
  getCurrentDirectory,
} from './directory'

let currentFile: string
let mainWindow: BrowserWindow

export function selectOpenFile() {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: 'Comic Files',
          extensions: ['cbr', 'cbz', 'pdf'],
        },
      ],
    })
    .then((files) => {
      if (!files) {
        return
      }
      mainWindow.webContents.send('fetching', true)
      const pathFile = files.filePaths[0]
      openFile(pathFile)
    })
}

function openFile(pathFile: string) {
  setCurrentFile(pathFile, true)
  setCurrentDirectory(pathFile)
  extractFiles(pathFile)
    .then((req) => {
      const { tmpFolder } = req
      // eslint-disable-next-line no-shadow
      // eslint-disable-next-line handle-callback-err
      readDirectory(tmpFolder, (err: any, files: string[]) => {
        const ext = ['.jpg', '.png']

        removeFilesByExtensions(files, tmpFolder, ext)
        // eslint-disable-next-line no-shadow
        readDirectory(tmpFolder, (err: any, files: string[]) => {
          if (err) throw new Error(err)
          if (process.env.NODE_ENV === 'development') {
            req.tmpFolder = path.relative(path.resolve(__dirname), tmpFolder)
          }
          mainWindow.webContents.send('fetching', false)
          mainWindow.webContents.send(
            'file-extracted',
            Object.assign({}, req, { files })
          )
        })
      })
    })
    .catch((err) => {
      throw Error(err)
    })
}

export function changeFile(nextOrPrevious: string) {
  readDirectory(getCurrentDirectory(), (err: any, files: string[]) => {
    if (err) throw Error(err)
    const filesFilter = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ext === '.cbz' || ext === '.cbr'
    })
    const index = filesFilter.findIndex((file) => file === currentFile)
    const newIndex = nextOrPrevious === 'next' ? index + 1 : index - 1
    const hasNext = newIndex < filesFilter.length && newIndex > -1
    if (hasNext)
      openFile(path.join(getCurrentDirectory(), filesFilter[newIndex]))
    else mainWindow.webContents.send('fetching', false)
  })
}

function setCurrentFile(file: string, isDirectory: boolean) {
  if (isDirectory) {
    currentFile = path.parse(file).base
  } else {
    currentFile = file
  }
}

export function removeFilesByExtensions(
  files: string[],
  tmp: string,
  ext: string[]
) {
  // eslint-disable-next-line no-param-reassign
  if (typeof ext === 'string') ext = [ext]

  files.forEach((file) => {
    const fileExt = path.extname(file).toLowerCase()
    const checked = ext.find((e) => e.toLowerCase() === fileExt)

    if (!checked) {
      fs.unlinkSync(path.join(tmp, file))
    }
  })
}

function extractFiles(pathFile: string): Promise<{ tmpFolder: string }> {
  const file = path.basename(pathFile)
  const tmpFolder = createTmpFolder(file)
  switch (path.extname(file)) {
    case '.cbz':
      return cbzExtract(pathFile, tmpFolder)
    case '.cbr':
      return cbrExtract(pathFile, tmpFolder)
    default:
      throw Error('Extension not supported')
  }
}

function cbzExtract(pathFile: string, tmpFolder: string) {
  return cbz(pathFile, { dir: tmpFolder }).then(() => ({ tmpFolder }))
}

function cbrExtract(pathFile: string, tmpFolder: string) {
  return new Promise<{ tmpFolder: string }>((resolve) => {
    const extractor = unrar.createExtractorFromFile(pathFile, tmpFolder)
    const extracted = extractor.extractAll()
    if (extracted[0].state === 'SUCCESS') resolve({ tmpFolder })
  })
}

export function setFileMainWindows(main: BrowserWindow) {
  mainWindow = main
}
