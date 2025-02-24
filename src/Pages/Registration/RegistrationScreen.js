import { Formik } from 'formik'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import CallToUs from '../../Components/CallToUs/CallToUs'
import FormBtn from '../../Components/FormBtn/FormBtn'
import FormInput from '../../Components/FormInput/FormInput'
import FormInputPass from '../../Components/FormInputPass/FormInputPass'
import Header from '../../Components/Header/Header'
import { useNetworkStatus } from '../../Hooks/UseNetChecker'
import { navigateAndReset } from '../../Services/NavigationService'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './RegistrationStyles'

const RegistrationScreen = ({ navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  //============================Constants==========================
  const { VERIFICATION_SCREEN, SIGN_IN_SCREEN } = CONSTANTS.Routes
  const { Union, Logo, Call, Mail } = Images
  const toast = useToast()
  const isConnected = useNetworkStatus()
  //============================Functions==========================
  const convertToPersianNumbers = input => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return input.replace(/\d/g, match => persianDigits[match])
  }
  const convertPersianToEnglishNumber = input => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return input.replace(/[۰-۹]/g, char => persianDigits.indexOf(char))
  }
  const handleSubmit = e => {
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
    const mobile = convertPersianToEnglishNumber(e.mobile)
    const password = convertPersianToEnglishNumber(e.password)
    const data = {
      mobile: mobile,
      fullname: e.fullname,
      email: e.email,
      password: password
    }
    serverRequest(data, e.mobile)
  }
  const serverRequest = (data, userMobile) => {
    const formdata = new FormData()
    formdata.append('fullname', data.fullname)
    formdata.append('mobile', data.mobile)
    formdata.append('email', data.email)
    formdata.append('password', data.password)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }
    fetch('https://acc.confidentech.net/api/signupuser', requestOptions)
      .then(response => response.text())
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
          navigateAndReset(SIGN_IN_SCREEN)
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
          navigation.navigate(VERIFICATION_SCREEN, { data, userMobile })
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

  return (
    <SafeAreaView style={styles.container}>
      <Header {...{ navigation }} />
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
          <Logo style={styles.logoImg} />
          <Text style={styles.title}>ثبت نام</Text>
          <View style={styles.mainContent}>
            <Formik
              initialValues={{
                mobile: '',
                fullname: '',
                email: '',
                password: '',
                repeatPassword: ''
              }}
              onSubmit={handleSubmit}
              validationSchema={Schemes.REGISTER_FORM}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                errors,
                isValid,
                handleBlur
              }) => {
                return (
                  <>
                    <FormInput
                      name={'mobile'}
                      value={convertToPersianNumbers(values.mobile)}
                      onChangeText={handleChange('mobile')}
                      placeholder={'شماره موبایل'}
                      onBlur={handleBlur('mobile')}
                      keyboardType={'numeric'}
                      error={values.mobile?.length && errors.mobile}
                      errorText={errors.mobile}
                      showTextError={true}
                      rightIcon={Call}
                    />
                    <FormInput
                      name={'fullname'}
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                      placeholder={'نام و نام خانوادگی'}
                      onBlur={handleBlur('fullname')}
                      error={values.fullname?.length && errors.fullname}
                      errorText={errors.fullname}
                      showTextError={true}
                      rightIcon={Union}
                    />
                    <FormInput
                      name={'email'}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder={'ایمیل'}
                      onBlur={handleBlur('email')}
                      error={values.email?.length && errors.email}
                      errorText={errors.email}
                      showTextError={true}
                      rightIcon={Mail}
                      keyboardType={'email-address'}
                    />
                    <FormInputPass
                      name={'password'}
                      value={convertToPersianNumbers(values.password)}
                      onChangeText={handleChange('password')}
                      placeholder={'رمز عبور'}
                      onBlur={handleBlur('password')}
                      error={values.password?.length && errors.password}
                      errorText={errors.password}
                      showTextError={true}
                      isIcon={true}
                    />
                    <FormInputPass
                      name={'repeatPassword'}
                      value={convertToPersianNumbers(values.repeatPassword)}
                      onChangeText={handleChange('repeatPassword')}
                      placeholder={'تکرار رمزعبور'}
                      onBlur={handleBlur('repeatPassword')}
                      error={
                        values.repeatPassword?.length && errors.repeatPassword
                      }
                      errorText={errors.repeatPassword}
                      showTextError={true}
                      isIcon={true}
                    />

                    <FormBtn
                      title={'تایید'}
                      disabled={isValid}
                      error={errors}
                      loading={loading}
                      handleSubmit={handleSubmit}
                      style={{ alignSelf: 'center', marginTop: 38 }}
                    />
                  </>
                )
              }}
            </Formik>
          </View>
          <CallToUs />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default RegistrationScreen
