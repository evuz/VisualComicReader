import { dialog, Dialog } from 'electron'
import { FileManagerAdapter } from '@vcr/domain'

export class DialogFileManager implements FileManagerAdapter {
  static factory() {
    return new DialogFileManager(dialog)
  }

  constructor(private dialog: Dialog) {}

  selectDirectory() {
    return this.dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
  }

  async selectFile(types: string[]) {
    const res = await this.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: types.join(', '),
          extensions: types,
        },
      ],
    })
    return res.filePaths[0]
  }
}
