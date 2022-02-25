import { Config } from '@vcr/domain'
import * as path from 'path'

import { IConfiguration } from '../../../Configuration/Entities/Configuration'
import { CreateTmpFolder } from '../CreateTmpFolder'

const config: IConfiguration = {
  platform: 'linux',
  paths: {
    app: __dirname,
    tmp: path.join(__dirname, 'tmp'),
    config: ''
  }
}

let folderError = false
const createFolder: any = {
  execute: () =>
    jest
      .fn()
      .mockImplementation(() =>
        folderError ? Promise.reject(Error()) : Promise.resolve(null)
      )
}

describe('CreateTmpFolder', () => {
  let instance: CreateTmpFolder

  beforeEach(() => {
    folderError = false
    instance = new CreateTmpFolder(new Config(config), createFolder)
  })

  test('should create folder', async () => {
    const tmpPath = await instance.run(path.join('/home/vcr/my-comic'))
    expect(tmpPath).toEqual({
      folder: path.join(config.paths.tmp, '4dddbc20416503abe3530f57ae68c60d'),
      isNew: true
    })
  })
})
