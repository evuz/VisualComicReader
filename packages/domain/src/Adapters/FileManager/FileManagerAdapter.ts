export type File = any
export type Directory = any

export interface FileManagerAdapter {
  selectFile(type: string[]): Promise<File>
  selectDirectory(): Promise<Directory>
}
