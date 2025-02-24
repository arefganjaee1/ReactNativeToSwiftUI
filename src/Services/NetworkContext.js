import NetInfo from '@react-native-community/netinfo'
import React, { createContext, useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'

export const NetworkContext = createContext()

export const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true)
  const toast = useToast() // Get the toast instance here

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected && isConnected) {
        // Check if the toast function exists before calling it
        if (toast) {
          toast.show('ارتباط با اینترنت برقرار نیست', {
            type: 'warning',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        }
      }
      setIsConnected(state.isConnected)
    })

    return () => unsubscribe()
  }, [isConnected, toast]) // Ensure toast and isConnected are dependencies

  return (
    <NetworkContext.Provider value={isConnected}>
      {children}
    </NetworkContext.Provider>
  )
}
