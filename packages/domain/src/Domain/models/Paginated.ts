export type Paginated<T> = {
  hasMore: boolean
  page: number
  n: number
  results: T[]
}
