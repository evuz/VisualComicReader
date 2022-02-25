import { Entity } from '../../Domain/models/Entity'
import { FileLibrary } from '../Enum/FileLibraryEnum'
import { ComicLibrary } from './ComicLibrary'

interface IFolderLibrary {
 name: string
 content: Array<FolderLibrary | ComicLibrary>
}

export interface FolderLibrary extends IFolderLibrary {}
export class FolderLibrary extends Entity<IFolderLibrary> {
  type = FileLibrary.Folder
}
