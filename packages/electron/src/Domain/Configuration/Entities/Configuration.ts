export type IConfiguration = {
  platform: typeof process.platform
  paths: {
    tmp: string
    app: string
    config: string
  }
}
