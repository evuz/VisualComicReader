import { Library } from '@vcr/domain'
import React, { createContext, useCallback, useState } from 'react'

import { useDomain } from '../../hooks/useDomain'

type ILibraryState = Library | null;

type ILibraryContext = {
  library: ILibraryState;
  hasLibrary: boolean;
  listenLibrary: () => void;
  selectLibrary: () => void;
};

const defaultValue: ILibraryContext = {
  library: null,
  hasLibrary: false,
  listenLibrary: () => {},
  selectLibrary: () => {}
}
export const LibraryContext = createContext<ILibraryContext>(defaultValue)

export const LibraryState: React.FC = ({ children }) => {
  const domain = useDomain()
  const [library, setLibrary] = useState<ILibraryState>(defaultValue.library)

  const selectLibrary = useCallback(() => {
    domain.getUseCase('selectLibrary').execute().then(l => console.log(l))
  }, [domain])

  const listenLibrary = useCallback(() => {
    const obs = domain.getListener('library')
      .execute()
      .subscribe(library => {
        setLibrary(library)
      })
    return () => obs.unsubscribe()
  }, [domain])

  const context: ILibraryContext = {
    library,
    hasLibrary: Boolean(library),
    listenLibrary,
    selectLibrary
  }

  return (
    <LibraryContext.Provider value={context}>
      {children}
    </LibraryContext.Provider>
  )
}
