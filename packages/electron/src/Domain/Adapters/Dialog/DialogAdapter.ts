export type MessageOptions = {
  message: string
  type?: 'none' | 'info' | 'error' | 'question' | 'warning'
  title?: string
  detail?: string
  noLink?: boolean
}

export interface DialogAdapter {
  show: (opts: MessageOptions) => Promise<void>
}
