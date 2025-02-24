import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import CallToUs from '../../Components/CallToUs/CallToUs'
import FormBtn from '../../Components/FormBtn/FormBtn'
import FormInput from '../../Components/FormInput/FormInput'
import FormInputPass from '../../Components/FormInputPass/FormInputPass'
import { useNetworkStatus } from '../../Hooks/UseNetChecker'
import { navigateAndReset } from '../../Services/NavigationService'
import { setAccToken } from '../../Stores/actions/AccTokenAction'
import { setCookie } from '../../Stores/actions/CookieAction'
import { setToken } from '../../Stores/actions/TokenAction'
import { setUserInfo } from '../../Stores/actions/UserDataAction'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './SignInStyle'

const SignInScreen = ({ navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  //============================Constants==========================
  const isConnected = useNetworkStatus()
  const dispatch = useDispatch()
  const {
    REGISTRATION_SCREEN,
    FORGOT_PASSWORD_SCREEN,
    HOME_SCREEN,
    ENTER_DEVICE_DATA_SCREEN
  } = CONSTANTS.Routes
  const { Union, Logo } = Images
  const toast = useToast()
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)

  //============================Functions==========================
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.dark)
    StatusBar.setTranslucent(true)
    StatusBar.setBarStyle('light-content')
  }, [])
  const convertToPersianNumbers = input => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return input.replace(/\d/g, match => persianDigits[match])
  }
  const convertPersianToEnglishNumber = input => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return input.replace(/[۰-۹]/g, char => persianDigits.indexOf(char))
  }
  const handleSignUp = () => {
    navigation.navigate(REGISTRATION_SCREEN)
  }

  const handleForgetPass = () => {
    navigation.navigate(FORGOT_PASSWORD_SCREEN)
  }

  const handleSubmit = values => {
    if (!isConnected) {
      toast.hideAll()
      toast.show('ارتباط با اینترنت برقرار نیست', {
        type: 'warning',
        placement: 'top',
        duration: 5000,
        offset: 100,
        animationType: 'zoom-in'
      })
      return
    }

    setLoading(true)
    const user = convertPersianToEnglishNumber(values.user)
    const pass = convertPersianToEnglishNumber(values.password)
    const data = {
      user: user,
      pass: pass
    }
    serverRequest(data)
  }

  const serverRequest = async data => {
    const formdata = new FormData()
    formdata.append('mobile', data.user)
    formdata.append('password', data.pass)
    formdata.append('fcmtoken', fcmToken)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        'https://acc.confidentech.net/api/signinuser',
        requestOptions
      )
      const result = await response.text()
      const parsedResult = JSON.parse(result)
      if (parsedResult?.status === 'error ') {
        setLoading(false)
        toast.show('این نام کاربری وجود ندارد', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else if (parsedResult?.status === ' error ') {
        setLoading(false)
        toast.show('نام کاربری یا رمز عبور اشتباه است', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else if (parsedResult?.status === 'error') {
        setLoading(false)
        toast.show('خطایی رخ داده است', {
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
          const jsonValue = JSON.stringify(userData)
          await AsyncStorage.setItem('userData', jsonValue)
          await getDevices(userData.sessionToken)
        } catch (e) {
          console.error('Error saving user data or fetching devices:', e)
        } finally {
          setLoading(false)
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
      console.error('Error in server request:', error)
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

  const getDevices = async token => {
    console.log('token', token)

    const config = {
      method: 'get',
      url: 'https://web.confidentech.net/api/devices',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios(config)
      if (response?.data?.length > 0) {
        console.log('response?.data', response?.data)
        toast.show('ورود با موفقیت انجام شد', {
          type: 'success',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
        navigateAndReset(HOME_SCREEN)
        const userState = JSON.stringify('home')
        await AsyncStorage.setItem('userState', userState)
      } else {
        const userState = JSON.stringify('enterDevice')
        await AsyncStorage.setItem('userState', userState)
        navigation.navigate(ENTER_DEVICE_DATA_SCREEN)
      }
    } catch (error) {
      console.error('Error fetching devices:', error)
      toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        offset: 100,
        animationType: 'zoom-in'
      })
    }
  }
  const handlePolicy = () => {
    const url = 'https://www.confidentech.net/privacy'
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <SafeAreaView />
          <Logo style={styles.logoImg} />
          <Text style={styles.title}>ورود</Text>
          <View style={styles.top}>
            <View style={styles.mainContent}>
              <Formik
                initialValues={{
                  user: '',
                  password: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={Schemes.SIGN_IN_FORM}
              >
                {({
                  handleChange,
                  values,
                  handleSubmit,
                  errors,
                  isValid,
                  handleBlur
                }) => (
                  <>
                    <FormInput
                      name={'user'}
                      value={convertToPersianNumbers(values.user)}
                      onChangeText={handleChange('user')}
                      placeholder={'نام کاربری (شماره موبایل)'}
                      onBlur={handleBlur('user')}
                      keyboardType={'numeric'}
                      error={values.user?.length && errors.user}
                      errorText={errors.user}
                      showTextError={true}
                      rightIcon={Union}
                    />
                    <FormInputPass
                      name={'password'}
                      value={convertToPersianNumbers(values.password)}
                      onChangeText={handleChange('password')}
                      placeholder={'رمز عبور'}
                      onBlur={handleBlur('password')}
                      keyboardType={'default'}
                      error={values.password?.length && errors.password}
                      errorText={errors.password}
                      showTextError={true}
                      isIcon={true}
                      style={{ marginTop: 20 }}
                    />
                    <TouchableOpacity
                      onPress={handleForgetPass}
                      style={styles.textBtn}
                    >
                      <Text style={styles.text}>فراموشی رمز عبور</Text>
                    </TouchableOpacity>
                    <FormBtn
                      title={'ورود'}
                      disabled={isValid}
                      error={errors}
                      loading={loading}
                      handleSubmit={handleSubmit}
                      style={{ alignSelf: 'center', marginTop: 30 }}
                    />
                  </>
                )}
              </Formik>
            </View>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.textBtn, { alignSelf: 'center' }]}
            >
              <Text style={styles.text}>حساب کاربری ندارید؟ </Text>
              <Text style={[styles.text, { color: Colors.redText }]}>
                ثبت نام
              </Text>
              <Text style={styles.text}> کنید </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handlePolicy}
            style={[styles.textBtn, { alignSelf: 'center', marginTop: 30 }]}
          >
            <Text style={styles.text}>سیاست های حفظ محرمانگی</Text>
          </TouchableOpacity>
          <CallToUs />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen
