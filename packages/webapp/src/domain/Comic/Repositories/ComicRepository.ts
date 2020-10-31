import { Comic } from '@vcr/domain'

export interface ComicRepository {
  openComic(file: any): Promise<Comic>
}
