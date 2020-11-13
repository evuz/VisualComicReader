import { Comic, File } from '@vcr/domain'

export interface ComicRepository {
  selectComic(): Promise<File>
  openComic(file: any): Promise<Comic>
}
