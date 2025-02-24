import { useContext } from 'react'
import { NetworkContext } from './../Services/NetworkContext'

export const useNetworkStatus = () => {
  const isConnected = useContext(NetworkContext)
  return isConnected
}
