import {
  IpcMessages,
  ProcessMainAdapter,
  FileManagerAdapter,
} from '@vcr/domain'

export class ElectronFileManager implements FileManagerAdapter {
  constructor(private electron: ProcessMainAdapter) {}

  selectFile(types: string[]) {
    return this.electron.request(IpcMessages.SelectFile, {
      payload: types,
    })
  }

  selectDirectory() {
    return this.electron.request(IpcMessages.SelectDirectory)
  }
}
