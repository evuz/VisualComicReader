import { ComicLibrary } from './ComicLibrary'
import { FolderLibrary } from './FolderLibrary'

export type Library = Array<FolderLibrary | ComicLibrary>
