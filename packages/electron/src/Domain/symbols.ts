const configurations = {
  Config: 'Config',
  Settings: 'Settings'
}

const adapters = {
  Dialog: 'Dialog',
  Screen: 'Screen',
  ProcessMain: 'ProcessMain',
  KeysListener: 'KeysListener',
  FileManager: 'FileManager',
  FileSystem: 'FileSystem'
}

const comics = {
  repositories: {
    ComicRepository: 'ComicRepository'
  },
  services: {
    OpenComicService: 'OpenFileService'
  },
  useCases: {
    OpenComicUseCase: 'OpenFileUseCase'
  }
}

const shortcuts = {
  repositories: {
    ShortcutsRepository: 'ShortcutsRepository'
  },
  services: {
    ShowInfoShortcutsService: 'ShowInfoShortcutsService',
    RegisterShortcutsService: 'RegisterShortcutsService'
  },
  listeners: {
    ShowInfoShortcutsListener: 'ShowInfoShortcutsListener'
  },
  useCases: {
    ShowInfoShortcutsUseCase: 'ShowInfoShortcutsUseCase',
    RegisterShortcutsUseCase: 'RegisterShortcutsUseCase'
  }
}

const settings = {
  repositories: {
    SettingsRepository: 'SettingsRepository'
  },
  services: {
    UpdateSettingsService: 'UpdateSettingsService',
    ReadSettingsService: 'ReadSettingsService',
    WriteSettingsService: 'WriteSettingsService',
    InitSettingsService: 'InitSettingsService',
    WatchSettingsService: 'WatchSettingsService'
  },
  listeners: {
    UpdateSettingsListener: 'UpdateSettingsListener',
    WatchSettingsListener: 'WatchSettingsListener'
  }
}

const screen = {
  repositories: {
    ScreenRepository: 'ScreenRepository'
  },
  listeners: {
    ToggleFullscreenListener: 'ToggleFullscreenListener'
  },
  useCases: {
    ToggleFullscreenUseCase: 'ToggleFullscreenUseCase'
  }
}

const file = {
  services: {
    SelectFileService: 'SelectFileService',
    SelectDirectoryService: 'SelectDirectoryService',
    InitSettings: 'InitSettings'
  },
  listeners: {
    SelectFileListener: 'SelectFileListener',
    SelectDirectoryListener: 'SelectDirectoryListener',
    OpenFileListener: 'OpenFileListener'
  },
  useCases: {
    SelectFileUseCase: 'SelectFileUseCase',
    SelectDirectoryUseCase: 'SelectDirectoryUseCase',
    ClearTmpFolderUseCase: 'ClearTmpFolderUseCase'
  }
}

const utils = {
  Init: 'Init',
  RemoveFolder: 'RemoveFolder',
  ReadFolder: 'ReadFolder',
  NormalizeAssetSrc: 'NormalizeAssetSrc'
}

export const Symbols = {
  ...configurations,
  ...adapters,
  ...comics.repositories,
  ...comics.services,
  ...comics.useCases,
  ...shortcuts.repositories,
  ...shortcuts.services,
  ...shortcuts.listeners,
  ...shortcuts.useCases,
  ...settings.repositories,
  ...settings.services,
  ...settings.listeners,
  ...screen.repositories,
  ...screen.listeners,
  ...screen.useCases,
  ...file.services,
  ...file.listeners,
  ...file.useCases,
  ...utils
}
