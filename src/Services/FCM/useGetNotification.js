import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

export const useGetNotification = () => {
  const navigation = useNavigation();

  const handleGetNotification = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification from background :', remoteMessage.notification);
    });
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };
  return {
    handleGetNotification,
  };
};
