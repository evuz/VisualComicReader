import { Library } from '@vcr/domain'
import React, { createContext, useCallback, useEffect, useState } from 'react'

import { useDomain } from '../../hooks/useDomain'

type ILibraryState = Library | null;

type ILibraryContext = {
  library: ILibraryState;
  hasLibrary: boolean;
  selectLibrary: () => void;
};

const defaultValue: ILibraryContext = {
  library: null,
  hasLibrary: false,
  selectLibrary: () => {}
}
export const LibraryContext = createContext<ILibraryContext>(defaultValue)

export const LibraryState: React.FC = ({ children }) => {
  const domain = useDomain()
  const [library, setLibrary] = useState<ILibraryState>(defaultValue.library)

  const selectLibrary = useCallback(() => {
    domain.getUseCase('selectLibrary').execute()
  }, [domain])

  useEffect(() => {
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
    selectLibrary
  }

  return (
    <LibraryContext.Provider value={context}>
      {children}
    </LibraryContext.Provider>
  )
}
