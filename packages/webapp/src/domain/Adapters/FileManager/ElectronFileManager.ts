import {
  IpcMessages,
  ProcessMainAdapter,
  FileManagerAdapter,
  File
} from '@vcr/domain'

export class ElectronFileManager implements FileManagerAdapter {
  constructor (private electron: ProcessMainAdapter) {}

  async selectFile (types: string[]) {
    const { payload } = await this.electron.request(IpcMessages.SelectFile, {
      payload: types
    })
    return payload
  }

  async selectDirectory () {
    const { payload } = await this.electron.request(IpcMessages.SelectDirectory)
    return payload
  }

  async openFile (file: File) {
    const { payload } = await this.electron.request(IpcMessages.OpenFile, {
      payload: file
    })
    return payload
  }
}
