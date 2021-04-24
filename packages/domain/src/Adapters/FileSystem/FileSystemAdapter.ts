export interface FileSystemAdapter {
  exist(path: string): Promise<boolean>
  mkDir(folderPath: string): Promise<void>
  readDir(folderPath: string): Promise<any>
  rmDir(folderPath: string): Promise<void>
}
