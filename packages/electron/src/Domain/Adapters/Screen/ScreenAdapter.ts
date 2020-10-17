export interface ScreenAdapter {
  state: boolean
  toggleFullscreen(): void
  setFullscreen(enable: boolean): void
}
