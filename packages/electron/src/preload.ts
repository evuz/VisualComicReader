import { WindowChannel, WindowMessageChannel } from '@vcr/domain'
import { ipcRenderer } from 'electron'

import { IpcRendererMessageChannel } from './Domain/Adapters/ProcessComunication/IpcRendererMessageChannel'

const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

async function main () {
  await windowLoaded

  const windowChannel = new WindowMessageChannel(window, WindowChannel.Main)
  const ipcRendererChannel = new IpcRendererMessageChannel(ipcRenderer)

  ipcRendererChannel.on().subscribe(({ payload }) => {
    windowChannel.send(payload.type, payload.data)
  })

  windowChannel.obs$.subscribe(message => {
    ipcRendererChannel.send(message.type, message.payload)
  })
}

main()
