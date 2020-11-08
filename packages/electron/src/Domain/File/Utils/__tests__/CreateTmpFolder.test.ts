import * as path from 'path'

import { IConfig } from '../../../Config/models/Config'
import { CreateTmpFolder } from '../CreateTmpFolder'

const config: IConfig = {
  platform: 'linux',
  paths: {
    app: __dirname,
    tmp: path.join(__dirname, 'tmp'),
  },
}

let folderError = false
const createFolder: any = {
  execute: () =>
    jest
      .fn()
      .mockImplementation(() =>
        folderError ? Promise.reject(Error()) : Promise.resolve(null)
      ),
}

describe('CreateTmpFolder', () => {
  let instance: CreateTmpFolder

  beforeEach(() => {
    folderError = false
    instance = new CreateTmpFolder(config, createFolder)
  })

  test('should create folder', async () => {
    const tmpPath = await instance.run(path.join('/home/vcr/my-comic'))
    expect(tmpPath).toEqual({
      folder: path.join(config.paths.tmp, '4dddbc20416503abe3530f57ae68c60d'),
      isNew: true,
    })
  })
})
