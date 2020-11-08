import { Comic, Path } from '@vcr/domain'

export interface ComicRepository {
  selectComic(): Promise<Path>
  openComic(file: any): Promise<Comic>
}
