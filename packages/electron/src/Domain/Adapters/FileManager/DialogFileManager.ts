import { dialog, Dialog } from 'electron'
import { FileManagerAdapter } from '@vcr/domain'
import { OpenFileFactory } from '../../File/Factories/OpenFileFactory'

export class DialogFileManager implements FileManagerAdapter {
  static factory (openFileFactory: OpenFileFactory) {
    return new DialogFileManager(dialog, openFileFactory)
  }

  constructor (
    private dialog: Dialog,
    private openFileFactory: OpenFileFactory
  ) {}

  async selectDirectory () {
    const res = await this.dialog.showOpenDialog({
      properties: ['openDirectory']
    })

    if (res.canceled) {
      return null
    }

    return res.filePaths[0]
  }

  async selectFile (types: string[]) {
    const res = await this.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: types.join(', '),
          extensions: types
        }
      ]
    })

    if (res.canceled) {
      return null
    }

    return res.filePaths[0]
  }

  async openFile (filePath: string) {
    const exec = this.openFileFactory.get(filePath)
    return exec.run()
  }
}
