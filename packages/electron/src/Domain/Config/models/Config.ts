export type IConfig = {
  platform: typeof process.platform
  paths: {
    tmp: string
    app: string
  }
}
