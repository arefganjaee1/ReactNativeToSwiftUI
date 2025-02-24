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
import { useSelector } from 'react-redux'
import CallToUs from '../../Components/CallToUs/CallToUs'
import FormBtn from '../../Components/FormBtn/FormBtn'
import FormInputPass from '../../Components/FormInputPass/FormInputPass'
import Header from '../../Components/Header/Header'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './NewPasswordStyles'

const NewPasswordScreen = ({ navigation, route }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  //============================Constants==========================
  const { SIGN_IN_SCREEN } = CONSTANTS.Routes
  const { Lock, Logo } = Images
  const code = route.params?.value
  const mobile = useSelector(state => state.mobile.mobile)
  const toast = useToast()
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
    const password = convertPersianToEnglishNumber(e.password)
    serverRequest(password)
  }
  const serverRequest = pass => {
    setLoading(true)
    const formdata = new FormData()
    formdata.append('mobile', mobile)
    formdata.append('code', code)
    formdata.append('new_password', pass)

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/forgetchangepass', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.message === 'Password changed successfully') {
          setLoading(false)
          toast.show('تغییر پسورد با موفقیت انجام شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
          navigation.navigate(SIGN_IN_SCREEN)
        }
        if (result.code === '400') {
          setLoading(false)
          toast.show('کد وارد شده اشتباه است', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        }
      })
      .catch(error => console.error(error))
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
          <Text style={styles.title}>بازیابی رمز عبور</Text>
          <View style={styles.mainContent}>
            <Formik
              initialValues={{
                password: '',
                newPassword: ''
              }}
              onSubmit={handleSubmit}
              validationSchema={Schemes.NEW_PASSWORD_FORM}
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
                    <FormInputPass
                      name={'password'}
                      value={convertToPersianNumbers(values.password)}
                      onChangeText={handleChange('password')}
                      placeholder={'رمز  عبور '}
                      onBlur={handleBlur('password')}
                      keyboardType={'default'}
                      error={values.password?.length && errors.password}
                      errorText={errors.password}
                      showTextError={true}
                      rightIcon={Lock}
                      secureText={true}
                    />
                    <FormInputPass
                      name={'newPassword'}
                      value={convertToPersianNumbers(values.newPassword)}
                      onChangeText={handleChange('newPassword')}
                      placeholder={'تکرار رمز عبور'}
                      onBlur={handleBlur('newPassword')}
                      keyboardType={'default'}
                      error={values.newPassword?.length && errors.newPassword}
                      errorText={errors.newPassword}
                      showTextError={true}
                      rightIcon={Lock}
                      secureText={true}
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
export default NewPasswordScreen
