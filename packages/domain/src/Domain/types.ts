export type Args<T = {}, K = {}> = {
  useCases?: T
  listeners?: K
  config?: any
}

export type SetConfig = {
  key: string
  config: any
}

export type GetConfig = {
  key: string
}
