export type Directory = any
export type File = string

export interface FileManagerAdapter {
  selectFile(type: string[]): Promise<File>
  selectDirectory(): Promise<Directory>
  openFile(file: File): Promise<any>
}
