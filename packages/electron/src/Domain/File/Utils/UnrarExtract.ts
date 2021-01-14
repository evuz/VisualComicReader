import { File } from '@vcr/domain'
import * as path from 'path'
import { spawn, StdioOptions } from 'child_process'
import { CreateTmpFolder } from './CreateTmpFolder'
import { IConfig } from '../../Config/models/Config'

const command = 'e'
const stdioOpts = {
  stdio: [0, 'pipe', 'pipe'] as StdioOptions,
}

export class UnrarExtract {
  private folder: string

  private get executablePath() {
    const platform = this.config.platform
    switch (platform) {
      case 'win32':
        return path.join(process.cwd(), 'bin', 'win32', 'unrar.exe')
      case 'linux':
        return path.join(process.cwd(), 'bin', 'linux', 'unrar')
      case 'darwin':
        return path.join(process.cwd(), 'bin', 'darwin', 'unrar')
      default:
        throw new Error(
          `this package is incompatible with platform ${platform}`
        )
    }
  }

  constructor(
    private path: File,
    private config: IConfig,
    private createTmpFolder: CreateTmpFolder
  ) {}

  async run() {
    const { folder, isNew } = await this.createTmpFolder.run(this.path)
    this.folder = folder
    if (isNew) {
      await this.unrar()
    }
    return folder
  }

  async unrar() {
    return new Promise<void>((resolve, reject) => {
      let errMsg = ''
      console.log(this.executablePath)
      const proc = spawn(
        this.executablePath,
        [command, this.path, this.folder],
        stdioOpts
      )

      proc.stderr.on('data', (chunk) => {
        const data = chunk.toString()
        errMsg += data
        console.log('Error', data)
      })

      proc.stdout.on('data', () => {})

      proc.on('exit', (code) => {
        console.log(code)
        if (code !== 0 || errMsg) {
          const error = new Error(errMsg)
          return reject(error)
        }

        resolve()
      })
    })
  }
}
