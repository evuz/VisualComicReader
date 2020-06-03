export type Args<T> = {
  useCases: T
  config?: any
}

export type SetConfig = {
  key: string
  config: any
}

export type GetConfig = {
  key: string
}
