export interface FileSystemAdapter {
  exist(path: string): Promise<boolean>
  mkDir(folderPath: string): Promise<void>
  writeJson(filePath: string, data: Object): Promise<void>
  readDir(folderPath: string): Promise<any>
  readJson<T extends Object>(filePath: string): Promise<T>
  rmDir(folderPath: string): Promise<void>
}
