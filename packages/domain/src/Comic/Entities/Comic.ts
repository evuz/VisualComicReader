import { Entity } from '../../Domain/models/Entity'

export interface IComic {
  pages: number
  name: string
  images: string[]
}

export interface Comic extends IComic {}
export class Comic extends Entity<IComic> {}
