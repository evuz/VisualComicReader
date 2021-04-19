import { Entity } from '../../Domain/models/Entity'
import { FileLibrary } from '../Enum/FileLibraryEnum'
import { ComicLibrary } from './ComicLibrary'

export interface IFolderLibrary {
 type: FileLibrary.Folder
 name: string
 content: FolderLibrary | ComicLibrary[]
}

export interface FolderLibrary extends IFolderLibrary {}
export class FolderLibrary extends Entity<IFolderLibrary> {}
