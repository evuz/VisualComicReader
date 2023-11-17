import {
  MessageType,
  MessagesCommunicationAdapter,
  FileManagerAdapter,
  File
} from '@vcr/domain'

export class ElectronFileManager implements FileManagerAdapter {
  constructor (private electron: MessagesCommunicationAdapter) {}

  async selectFile (types: string[]) {
    const { payload } = await this.electron.request<File>(MessageType.SelectFile, {
      payload: types
    })
    return payload
  }

  async selectDirectory () {
    const { payload } = await this.electron.request(MessageType.SelectDirectory)
    return payload
  }

  async openFile (file: File) {
    const { payload } = await this.electron.request(MessageType.OpenFile, {
      payload: file
    })
    return payload
  }
}
