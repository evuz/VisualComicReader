import { Entity } from '../../Domain/models/Entity'
import { FileLibrary } from '../Enum/FileLibraryEnum'

export interface IComicLibrary {
 type: FileLibrary.Comic
 name: string
 path: string
}

export interface ComicLibrary extends IComicLibrary {}
export class ComicLibrary extends Entity<IComicLibrary> {}
