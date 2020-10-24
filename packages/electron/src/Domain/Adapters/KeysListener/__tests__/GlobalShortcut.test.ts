import { GlobalShortcut } from '../GlobalShortcut'

function browserWindowsFactory(): any {
  const store = new Map<string, Function>()
  return {
    on: jest.fn().mockImplementation((code: string, fn) => {
      store.set(code, fn)
    }),
    store,
  }
}

function globalShortcutFactory(): any {
  const store = new Map<string, Function>()
  return {
    register: jest.fn().mockImplementation((code: string, fn) => {
      store.set(code, fn)
    }),
    unregister: jest.fn(),
    unregisterAll: jest.fn(),
    store,
  }
}

describe('GlobalShortcut', () => {
  let browserWindows: any
  let globalShortcut: any

  beforeEach(() => {
    browserWindows = browserWindowsFactory()
    globalShortcut = globalShortcutFactory()
  })

  test('should create instance', () => {
    const instance = GlobalShortcut.factory(browserWindows)
    expect(instance).toBeInstanceOf(GlobalShortcut)
  })

  test('should register keys', (done) => {
    const instance = new GlobalShortcut(browserWindows, globalShortcut)

    instance.register('K').subscribe(() => {
      done()
    })

    globalShortcut.store.get('K')()
  })

  test('should unregister keys', () => {
    const instance = new GlobalShortcut(browserWindows, globalShortcut)

    expect(globalShortcut.unregister).not.toHaveBeenCalled()

    instance.register('K').subscribe().unsubscribe()

    expect(globalShortcut.unregister).toHaveBeenCalledTimes(1)
  })

  test('should register $mod like as CmdOrCtrl', () => {
    const instance = new GlobalShortcut(browserWindows, globalShortcut)
    const count = jest.fn()

    instance.register('$mod+K').subscribe(count)

    expect(globalShortcut.store.get('$mod+K')).toBeUndefined()

    globalShortcut.store.get('CmdOrCtrl+K')()
    expect(count).toHaveBeenCalledTimes(1)
  })

  test('should not fire shortcut if window is not focus', () => {
    const instance = new GlobalShortcut(browserWindows, globalShortcut)

    instance.register('K').subscribe()
    expect(globalShortcut.register).toHaveBeenCalledTimes(1)
    expect(globalShortcut.unregisterAll).not.toHaveBeenCalled()

    browserWindows.store.get('blur')()
    expect(globalShortcut.register).toHaveBeenCalledTimes(1)
    expect(globalShortcut.unregisterAll).toHaveBeenCalledTimes(1)

    browserWindows.store.get('focus')()
    expect(globalShortcut.register).toHaveBeenCalledTimes(2)
    expect(globalShortcut.unregisterAll).toHaveBeenCalledTimes(1)
  })
})
