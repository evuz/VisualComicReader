import { Entity } from '../../Domain/models/Entity'
import { FileLibrary } from '../Enum/FileLibraryEnum'

interface IComicLibrary {
 name: string
 path: string
}

export interface ComicLibrary extends IComicLibrary {}
export class ComicLibrary extends Entity<IComicLibrary> {
  type = FileLibrary.Comic
}
