/**
 * @format
 */

import { AppRegistry } from 'react-native'
// import PushNotification, { Importance } from 'react-native-push-notification'
import App from './App'
import { name as appName } from './app.json'

// I18nManager.allowRTL(false)
// I18nManager.forceRTL(false)

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('LOCAL NOTIFICATION ==>', notification)
//   },
//   requestPermissions: Platform.OS === 'ios'
// })

// PushNotification.createChannel(
//   {
//     channelId: 'message-channel-id',
//     channelName: `messagesocket`,
//     channelDescription: 'A default channel',
//     playSound: true,
//     soundName: 'default',
//     importance: Importance.HIGH,
//     vibrate: true
//   },
//   created => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// )
AppRegistry.registerComponent(appName, () => App)
