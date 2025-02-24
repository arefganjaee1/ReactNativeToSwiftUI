import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetFcmToken } from '../../Services/FCM/FireBaseGetToken'
import { useGetNotification } from '../../Services/FCM/useGetNotification'
import { navigateAndReset } from '../../Services/NavigationService'
import { setAccToken } from '../../Stores/actions/AccTokenAction'
import { setCookie } from '../../Stores/actions/CookieAction'
import { setFcmToken } from '../../Stores/actions/FcmTokenAction'
import { setToken } from '../../Stores/actions/TokenAction'
import { setUserInfo } from '../../Stores/actions/UserDataAction'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import ForceUpdateModal from './ForceUpdateModal/ForceUpdateModal'
import styles from './SplashStyles'

const SplashScreen = () => {
  const [forceUpdateVisible, setForceUpdateVisible] = useState(false)
  const [link, setLink] = useState('')
  const { handleGetNotification } = useGetNotification()
  const dispatch = useDispatch()
  const { Splash } = Images
  const {
    SIGN_IN_SCREEN,
    HOME_SCREEN,
    ENTER_DEVICE_DATA_SCREEN,
    SUBSCRIPTION_RECHARGE_SCREEN
  } = CONSTANTS.Routes
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)

  useEffect(() => {
    requestGetFcmToken()
      .then(token => {
        dispatch(setFcmToken(token))
      })
      .catch(error => {
        console.error('Failed to get FCM token:', error)
      })
    handleGetNotification()
    setUserData()
  }, [])

  const setUserData = async () => {
    try {
      const userDataValue = await AsyncStorage.getItem('userData')
      const userStateValue = await AsyncStorage.getItem('userState')
      const userData = JSON.parse(userDataValue)
      const userState = JSON.parse(userStateValue)
      const token = userData?.sessionToken
      const accToken = userData?.acctoken
      const cookie = userData?.usersession

      console.log('token >>>', token)
      console.log('accToken >>>', accToken)

      if (userState === 'enterDevice') {
        setTimeout(() => {
          navigateAndReset(SIGN_IN_SCREEN)
        }, 2000)
      } else {
        if (token) {
          dispatch(setToken(token))
          dispatch(setAccToken(accToken))
          dispatch(setCookie(cookie))
          getCookie(accToken)
          splashServerRequest(accToken)
        } else {
          setTimeout(() => {
            navigateAndReset(SIGN_IN_SCREEN)
          }, 2000)
        }
      }
    } catch (e) {
      console.error('Error', e)
    }
  }

  const getCookie = accToken => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/getcoockie', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.status === 'ok') {
          const cookie = result.usersession
          dispatch(setCookie(cookie))
          console.log('cookie >>>>>', cookie)
        }
      })
      .catch(error => console.error(error))
  }

  const splashServerRequest = accToken => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const formdata = new FormData()
    formdata.append('app_version', '1')
    formdata.append('os', 'android')
    formdata.append('fcmtoken', fcmToken)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/splash', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.update) {
          setForceUpdateVisible()
          setLink(result?.updatelink)
        } else {
          if (result?.status === 'ok') {
            dispatch(setUserInfo(result))
            if (result?.hassubscription === '0') {
              setTimeout(() => {
                navigateAndReset(SUBSCRIPTION_RECHARGE_SCREEN)
              }, 1000)
            } else {
              let reviewid = result?.reviewid
              setTimeout(() => {
                navigateAndReset(HOME_SCREEN, { reviewid })
              }, 1000)
            }
          } else {
            setTimeout(() => {
              navigateAndReset(SIGN_IN_SCREEN)
            }, 1000)
          }
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <ImageBackground source={Splash} style={styles.container}>
      <ForceUpdateModal
        isVisible={forceUpdateVisible}
        setVisible={setForceUpdateVisible}
        {...{ link }}
      />
      <StatusBar hidden />
    </ImageBackground>
  )
}

export default SplashScreen
