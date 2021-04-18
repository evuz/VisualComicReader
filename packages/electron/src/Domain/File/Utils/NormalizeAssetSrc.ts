import * as p from 'path'

export class NormalizeAssetSrc {
  execute (path: string) {
    return path
  }
}

export class DevNormalizeAssetSrc {
  execute (path: string) {
    const relativePath = p.relative(process.cwd(), path)
    return `local://${relativePath}`
  }
}
