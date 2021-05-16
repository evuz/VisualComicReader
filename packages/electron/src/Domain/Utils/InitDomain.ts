import { Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { OpenComicService } from '../Comic/Services/OpenComicService'
import { OpenFileListener } from '../File/Listeners/OpenFileListener'
import { SelectDirectoryListener } from '../File/Listeners/SelectDirectoryListener'
import { SelectFileListener } from '../File/Listeners/SelectFileListener'
import { SelectDirectoryService } from '../File/Services/SelectDirectoryService'
import { SelectFileService } from '../File/Services/SelectFileService'
import { ClearTmpFolder } from '../File/UseCases/ClearTmpFolder'
import { WatchLibraryService } from '../Library/Services/WatchLibraryService'
import { ToggleFullscreenListener } from '../Screen/Listeners/ToggleFullscreenListener'
import { ToggleFullscreenUsecase } from '../Screen/UseCases/ToggleFullscreenUseCase'
import { UpdateSettingsListener } from '../Settings/Listeners/UpdateSettingsListener'
import { InitSettingsService } from '../Settings/Services/InitSettingsService'
import { UpdateSettingsService } from '../Settings/Services/UpdateSettingsService'
import { WatchSettingsService } from '../Settings/Services/WatchSettingsService'
import { ShowInfoShortcutListener } from '../Shortcuts/Listeners/ShowInfoShortcutListener'
import { RegisterShortcutsService } from '../Shortcuts/Services/RegisterShortcutsService'
import { ShowInfoShortcutsService } from '../Shortcuts/Services/ShowInfoShortcutsService'

import { Symbols } from '../symbols'

export class InitDomain implements Service {
  static [DEPS_SYMBOL] = [
    Symbols.InitSettingsService,
    Symbols.ClearTmpFolderUseCase,
    Symbols.RegisterShortcutsService,
    Symbols.ToggleFullscreenListener,
    Symbols.ToggleFullscreenUseCase,
    Symbols.ShowInfoShortcutsListener,
    Symbols.ShowInfoShortcutsService,
    Symbols.SelectFileListener,
    Symbols.SelectFileService,
    Symbols.SelectDirectoryListener,
    Symbols.SelectDirectoryService,
    Symbols.OpenFileListener,
    Symbols.OpenComicService,
    Symbols.UpdateSettingsListener,
    Symbols.UpdateSettingsService,
    Symbols.WatchSettingsService,
    Symbols.WatchLibraryService
  ]

  constructor (
    private initSettings: InitSettingsService,
    private clearTmpFolderService: ClearTmpFolder,
    private registerShortcutsService: RegisterShortcutsService,
    private toggleFullscreenListener: ToggleFullscreenListener,
    private toggleFullscreenUseCase: ToggleFullscreenUsecase,
    private showInfoShortcutsListener: ShowInfoShortcutListener,
    private showInfoShortcustService: ShowInfoShortcutsService,
    private selectFileListener: SelectFileListener,
    private selectFileService: SelectFileService,
    private selectDirectoryListener: SelectDirectoryListener,
    private selectDirectoryService: SelectDirectoryService,
    private openFileListener: OpenFileListener,
    private openComicService: OpenComicService,
    private updateSettingsListener: UpdateSettingsListener,
    private updateSettingsService: UpdateSettingsService,
    private watchSettingsService: WatchSettingsService,
    private watchLibraryService: WatchLibraryService
  ) {}

  async execute () {
    await this.initSettings.execute()

    await this.clearTmpFolderService.execute()

    this.registerShortcutsService.execute()

    this.toggleFullscreenListener.execute().subscribe(() => {
      this.toggleFullscreenUseCase.execute()
    })

    this.showInfoShortcutsListener.execute().subscribe(() => {
      this.showInfoShortcustService.execute()
    })

    this.selectFileListener.execute().subscribe(async ({ payload, response }) => {
      const file = await this.selectFileService.execute(payload)
      response(file)
    })

    this.selectDirectoryListener.execute().subscribe(async ({ response }) => {
      const directory = await this.selectDirectoryService.execute()
      response(directory)
    })

    this.openFileListener.execute().subscribe(async ({ payload, response }) => {
      const comic = await this.openComicService.execute(payload)
      response(comic)
    })

    this.updateSettingsListener.execute().subscribe(async ({ payload, response }) => {
      await this.updateSettingsService.execute(payload)
      response(null)
    })

    this.watchSettingsService.execute()
    this.watchLibraryService.execute()
  }
}
