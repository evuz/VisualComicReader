import { ComicLibrary, FolderLibrary, Library, Settings } from '@vcr/domain'
import * as path from 'path'
import fse from 'fs-extra'
import { DEPS_SYMBOL } from 'depsin'
import { FSWatcher } from 'chokidar'
import { Subject } from 'rxjs'

import { Symbols } from '../../symbols'
import { LibraryRepository } from './LibraryRepository'

export class NodeLibraryRepository implements LibraryRepository {
  static [DEPS_SYMBOL] = [Symbols.Settings]

  private subject = new Subject<void>()
  private watchCurrentPath: string
  private watcher: FSWatcher

  constructor (private settings: Settings) {
    this.watcher = new FSWatcher({ ignoreInitial: true })
    this.watcher.on('add', () => this.updateLibrary())
    this.watcher.on('change', () => this.updateLibrary())
    this.watcher.on('unlink', () => this.updateLibrary())
  }

  watchLibrary () {
    if (this.watchCurrentPath) {
      this.off(this.watchCurrentPath)
    }
    this.watchCurrentPath = this.settings.get('libraryPath')
    if (this.watchCurrentPath) {
      this.on(this.watchCurrentPath)
    }
    return this.subject.asObservable()
  }

  async readLibrary (): Promise<Library> {
    const libraryPath = this.settings.get('libraryPath')

    const library = await this.readDir(libraryPath)
    return Promise.resolve(library)
  }

  async readDir (dirPath: string): Promise<Library> {
    const directory: Library = []
    const dir = await fse.readdir(dirPath, { withFileTypes: true })

    for (let index = 0; index < dir.length; index++) {
      const dirent = dir[index]
      if (dirent.isDirectory()) {
        const folderPath = path.join(dirPath, dirent.name)
        const folder = new FolderLibrary({
          name: dirent.name,
          content: await this.readDir(folderPath)
        })
        directory.push(folder)
      }
      if (dirent.isFile()) {
        const ext = path.extname(dirent.name)
        if (['.cbr', '.cbz'].includes(ext)) {
          const file = new ComicLibrary({
            name: dirent.name,
            path: path.join(dirPath, dirent.name)
          })
          directory.push(file)
        }
      }
    }

    return directory
  }

  private off (toWatch: string) {
    const glob = this.createGlob(toWatch)
    this.watcher.unwatch(glob)
  }

  private on (toWatch: string) {
    const glob = this.createGlob(toWatch)
    this.watcher.add(glob)
  }

  private updateLibrary () {
    this.subject.next()
  }

  private createGlob (base: string) {
    return path.join(base, '**', '*.(cbr|cbz)')
  }
}
