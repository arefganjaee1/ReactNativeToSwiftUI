import messaging from '@react-native-firebase/messaging'
import { Alert, Platform } from 'react-native'

export async function requestGetFcmToken () {
  try {
    // iOS: Request permission before getting the token
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (!enabled) {
        Alert.alert(
          'Permission Denied',
          'Please enable push notifications in settings.'
        )
        throw new Error('Notification permissions not granted')
      }
      console.log('Authorization status:', authStatus)
    }

    // Get the device FCM token
    const token = await messaging().getToken()
    console.log('FCM Token:', token)

    // Listen for token refresh
    messaging().onTokenRefresh(newToken => {
      console.log('FCM Token refreshed:', newToken)
      // Handle the new token if needed (e.g., update backend)
    })

    return token
  } catch (error) {
    console.error('Failed to get FCM token:', error)
    throw error
  }
}
