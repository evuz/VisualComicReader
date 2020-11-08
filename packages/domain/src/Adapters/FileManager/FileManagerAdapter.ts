export type File = any
export type Directory = any
export type Path = any

export interface FileManagerAdapter {
  selectFile(type: string[]): Promise<Path>
  selectDirectory(): Promise<Directory>
  openFile(file: Path): Promise<File>
}
