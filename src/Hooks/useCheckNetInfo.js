import NetInfo from '@react-native-community/netinfo'
import { useState } from 'react'
import { useToast } from 'react-native-toast-notifications'

export const useCheckNetInfo = () => {
  const [netInfo, setNetInfo] = useState(true)
  const toast = useToast()

  const handleNetChecking = () => {
    NetInfo.fetch().then(state => {
      if (state.type === 'none') {
        setNetInfo(false)
        toast.show('ارتباط با اینترنت برقرار نیست', {
          type: 'warning',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else {
        setNetInfo(true)
      }
    })
  }

  return {
    netInfo,
    handleNetChecking
  }
}
