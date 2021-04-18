import { useContext } from 'react'
import { DomainContext } from '../context/Domain/DomainContext'

export function useDomain () {
  return useContext(DomainContext)
}
