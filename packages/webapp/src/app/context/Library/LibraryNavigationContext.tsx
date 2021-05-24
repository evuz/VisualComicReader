import { FolderLibrary, Library } from '@vcr/domain'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { LibraryContext } from './LibraryContext'

type ILibraryNavigationState = Library | null;

type ILibraryNavigationContext = {
  library: ILibraryNavigationState;
  stack: FolderLibrary[];
  navigate: (folder: FolderLibrary) => void;
};

function noop () {}
const defaultValue: ILibraryNavigationContext = {
  library: null,
  stack: [],
  navigate: noop
}
export const LibraryNavigationContext = createContext<ILibraryNavigationContext>(defaultValue)

export const LibraryNavigationState: React.FC = ({ children }) => {
  const { library } = useContext(LibraryContext)
  const init = useRef(false)
  const [navigation, setNavigation] = useState<FolderLibrary[]>([])

  useEffect(() => {
    if (!init.current) {
      init.current = true
      return
    }

    setNavigation([])
  }, [library])

  const navigate = useCallback((folder) => {
    setNavigation(n => n.concat(folder))
  }, [])

  const navigationLength = navigation.length
  const librarySelected = navigation.length ? navigation[navigationLength - 1].content : library

  const context: ILibraryNavigationContext = {
    stack: navigation,
    library: librarySelected,
    navigate
  }

  return (
    <LibraryNavigationContext.Provider value={context}>
      {children}
    </LibraryNavigationContext.Provider>
  )
}
