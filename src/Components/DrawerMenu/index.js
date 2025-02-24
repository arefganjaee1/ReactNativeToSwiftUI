// AnimatedDrawer.js
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import MenueItem from '../../Components/MenueItem/MenueItem'
import Spacer from '../../Components/Spacer/Spacer'
import { navigateAndReset } from '../../Services/NavigationService'
import { Colors } from '../../Theme'
import CONSTANTS from '../../Values/Constants'
import { convertEnglishToPersianNumber } from './../../Helpers/numberConverter'
import ExitModal from './../ExitModal/ExitModal'

const AnimatedDrawer = ({ onClose, isDrawerOpen, navigation }) => {
  //============================STATE==========================
  const [visible, setVisible] = useState(false)
  const userData = useSelector(state => state.userData.userData)
  //============================Constants==========================
  const {
    USER_ACCOUNT_SCREEN,
    NOTIFICATIONS_SCREEN,
    SUBSCRIPTION_RECHARGE_SCREEN,
    SMS_RECHARGE_SCREEN,
    DEVICES_SCREEN,
    COMMAND_SENDING_SCREEN,
    REPORTS_SCREEN,
    CONTACT_SUPPORT_SCREEN,
    SIGN_IN_SCREEN
  } = CONSTANTS.Routes
  //============================Functions==========================
  const handleExitModal = () => {
    setVisible(true)
  }
  const DrawerMenuWidth = Dimensions.get('window').width
  const translateX = useSharedValue(isDrawerOpen ? 0 : DrawerMenuWidth)

  useEffect(() => {
    translateX.value = withSpring(isDrawerOpen ? 0 : DrawerMenuWidth, {
      damping: 15,
      stiffness: 80,
      mass: 1,
      velocity: 1,
      easing: Easing.inOut(Easing.ease)
    })

    if (!isDrawerOpen) {
      onClose()
    }
  }, [isDrawerOpen, onClose, translateX])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  })

  const onMenueItemPress = id => {
    switch (id) {
      case 1:
        navigation.navigate(USER_ACCOUNT_SCREEN)
        break
      case 2:
        navigation.navigate(NOTIFICATIONS_SCREEN)
        break
      case 3:
        navigation.navigate(SUBSCRIPTION_RECHARGE_SCREEN)
        break
      case 4:
        navigation.navigate(SMS_RECHARGE_SCREEN)
        break
      case 5:
        navigation.navigate(DEVICES_SCREEN)
        break
      case 6:
        navigation.navigate(COMMAND_SENDING_SCREEN)
        break
      case 7:
        navigation.navigate(REPORTS_SCREEN)
        break
      case 8:
        navigation.navigate(CONTACT_SUPPORT_SCREEN)
        break
      default:
        console.log('default')
    }
  }

  const onExitPress = async () => {
    try {
      await AsyncStorage.removeItem('userData')
      navigateAndReset(SIGN_IN_SCREEN)
      return true
    } catch (exception) {
      return false
    }
  }

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyle]}>
      <ExitModal
        isVisible={visible}
        setVisible={setVisible}
        onExitPress={onExitPress}
      />
      <View style={styles.drawer}>
        <View style={styles.drawerMain}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
              paddingBottom: 10
            }}
          >
            <View style={styles.accountName}>
              <Text style={styles.textTitle}>{userData?.username}</Text>
              <Text style={styles.textTitle}>
                {' '}
                {convertEnglishToPersianNumber(userData?.usermobile)}
              </Text>
            </View>
            <Spacer
              {...{
                color: '#FFFFFF14',
                style: { marginTop: 10, marginBottom: 10 }
              }}
            />
            <MenueItem
              {...{ id: 1, title: 'حساب کاربری' }}
              onMenueItemPress={() => onMenueItemPress(1)}
            />
            <MenueItem
              {...{ id: 2, title: 'اعلانها' }}
              onMenueItemPress={() => onMenueItemPress(2)}
            />
            <MenueItem
              {...{ id: 3, title: 'شارژ اشتراک' }}
              onMenueItemPress={() => onMenueItemPress(3)}
            />
            <MenueItem
              {...{ id: 4, title: 'شارژ پیامک' }}
              onMenueItemPress={() => onMenueItemPress(4)}
            />
            <MenueItem
              {...{ id: 5, title: 'دستگاه ها' }}
              onMenueItemPress={() => onMenueItemPress(5)}
            />
            <MenueItem
              {...{ id: 6, title: 'ارسال دستورات' }}
              onMenueItemPress={() => onMenueItemPress(6)}
            />
            <MenueItem
              {...{ id: 7, title: 'گزارشات' }}
              onMenueItemPress={() => onMenueItemPress(7)}
            />
            <Spacer
              {...{
                color: '#FFFFFF14',
                style: { marginTop: 10, marginBottom: 10 }
              }}
            />
            <MenueItem
              {...{ id: 8, title: 'تماس با پشتیبانی' }}
              onMenueItemPress={() => onMenueItemPress(8)}
            />
            <MenueItem
              {...{
                id: 9,
                title: 'خروج از برنامه',
                titleStyle: { color: Colors.redText }
              }}
              onMenueItemPress={() => handleExitModal()}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => onClose()}
          style={styles.drawerClose}
        ></TouchableOpacity>
      </View>
    </Animated.View>
  )
}

export default AnimatedDrawer
