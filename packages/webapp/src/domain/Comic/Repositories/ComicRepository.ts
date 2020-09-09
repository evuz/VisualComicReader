import { Comic } from '@vcr/domain'

export interface ComicRepository {
  selectComic(): Promise<Comic>
}
