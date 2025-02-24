import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/Header/Header'
import Indicator from '../../Components/Indicator/Indicator'
import { navigateAndReset } from '../../Services/NavigationService'
import { setAccToken } from '../../Stores/actions/AccTokenAction'
import { setCookie } from '../../Stores/actions/CookieAction'
import { setToken } from '../../Stores/actions/TokenAction'
import { setUserInfo } from '../../Stores/actions/UserDataAction'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './VerificationStyle'

const VerificationScreen = ({ route, navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [timer, setTimer] = useState(null)
  const [counter, setCounter] = useState(120)
  const [resend, setrResend] = useState(true)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })
  //============================Constants==========================
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)
  const toast = useToast()
  const dispatch = useDispatch()
  const userMobile = route.params?.userMobile
  const data = route.params?.data
  const { Logo } = Images
  const CELL_COUNT = 5
  const { ENTER_DEVICE_DATA_SCREEN } = CONSTANTS.Routes
  //============================Functions==========================
  const getOtpRequest = () => {
    const formdata = new FormData()
    formdata.append('fullname', data?.fullname)
    formdata.append('mobile', data?.mobile)
    formdata.append('email', data?.email)
    formdata.append('password', data?.password)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }
    fetch('https://acc.confidentech.net/api/signupuser', requestOptions)
      .then(result => {
        const response = JSON.parse(result)
        if (response?.status === 'user exist') {
          setLoading(false)
          toast.show('این نام کاربری قبلا ثبت نام شده است', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else if (response?.status === 'error') {
          setLoading(false)
          toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else if (response?.code === '200') {
          setLoading(false)
          console.log('response >>>>', response)
        }
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
        toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      })
  }

  const sendOtpRequest = async () => {
    const formdata = new FormData()
    formdata.append('mobile', userMobile)
    formdata.append('otp', value)
    formdata.append('fcmtoken', fcmToken)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        'https://acc.confidentech.net/api/checkuserotp',
        requestOptions
      )
      const result = await response.text()
      const parsedResult = JSON.parse(result)
      console.log('parsedResult', parsedResult)
      if (parsedResult?.status === 'error') {
        toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else if (parsedResult?.status === 'incorrect otp code') {
        setLoading(false)
        toast.show('کد وارد شده اشتباه است', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else if (parsedResult?.status === 'ok' && parsedResult?.sessionToken) {
        const userData = parsedResult
        try {
          dispatch(setToken(userData.sessionToken))
          dispatch(setAccToken(userData.acctoken))
          dispatch(setCookie(userData.usersession))
          dispatch(setUserInfo(userData))
          // const jsonValue = JSON.stringify(userData)
          // await AsyncStorage.setItem('userData', jsonValue)
        } catch (e) {
          console.error('Error', e)
        } finally {
          setLoading(false)
          navigateAndReset(ENTER_DEVICE_DATA_SCREEN)
        }
      } else {
        setLoading(false)
        toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      }
    } catch (error) {
      console.error(error)
      toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        offset: 100,
        animationType: 'zoom-in'
      })
      setLoading(false)
    }
  }

  const sendOtp = () => {
    setLoading(true)
    sendOtpRequest()
  }
  useEffect(() => {
    if (value.length == 5) {
      sendOtp()
    }
  }, [value])
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1)
    }, 1000)
    setTimer(interval)
  }, [])
  useEffect(() => {
    if (counter === 0) {
      clearInterval(timer)
      setrResend(!resend)
      setCounter(120)
    }
  }, [counter])

  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  const onResendCode = () => {
    setValue('')
    setrResend(!resend)
    getOtpRequest()
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1)
    }, 1000)
    setTimer(interval)
  }

  const stopTimer = () => {
    clearInterval(timer)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header {...{ navigation }} />
      <Logo style={styles.logoImg} />
      <View style={styles.top}>
        <ScrollView>
          <View style={styles.mainContent}>
            <KeyboardAvoidingView
              style={{ width: '100%' }}
              behavior={'padding'}
            >
              <Text style={styles.text}>
                کد ارسال شده به شماره موبایل خود را وارد کنید
              </Text>
              <View style={styles.rootCover}>
                <View style={styles.root}>
                  {!loading && (
                    <CodeField
                      ref={ref}
                      {...props}
                      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                      value={value}
                      onChangeText={setValue}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType='number-pad'
                      textContentType='oneTimeCode'
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  )}
                  {loading && <Indicator color={'white'} size={20} />}
                </View>
              </View>
              <View style={styles.resend}>
                {resend && (
                  <View style={styles.row}>
                    <Text style={styles.resendText}>
                      زمان باقیمانده تا درخواست مجدد{' '}
                    </Text>
                    <Text style={[styles.resendText, { color: Colors.orange }]}>
                      {counter}
                    </Text>
                  </View>
                )}
                {!resend && (
                  <View style={styles.row}>
                    <Text style={styles.resendText}>کد را دریافت نکردید؟ </Text>
                    <TouchableOpacity onPress={onResendCode}>
                      <Text
                        style={[styles.resendText, { color: Colors.orange }]}
                      >
                        ارسال مجدد
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
      <View></View>
    </View>
  )
}
export default VerificationScreen
