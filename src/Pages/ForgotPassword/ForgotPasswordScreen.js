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
import { useDispatch } from 'react-redux'
import CallToUs from '../../Components/CallToUs/CallToUs'
import FormBtn from '../../Components/FormBtn/FormBtn'
import Header from '../../Components/Header/Header'
import InputWithIconAndText from '../../Components/InputWithIconAndText'
import { setMobile } from '../../Stores/actions/MobileAction'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './ForgotPasswordStyles'

const ForgotPasswordScreen = ({ navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  //============================Constants==========================
  const { FORGET_PASS_VERIFICATION_SCREEN } = CONSTANTS.Routes
  const { Call, Logo } = Images
  const dispatch = useDispatch()
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
    const mobile = convertPersianToEnglishNumber(e.mobile)
    const data = {
      mobile: mobile
    }
    serverRequest(data)
  }
  const serverRequest = data => {
    setLoading(true)
    const formdata = new FormData()
    formdata.append('mobile', data.mobile)

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/forgetpass', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result?.code === '200') {
          setLoading(false)
          dispatch(setMobile(data.mobile))
          toast.show('کد با موفقیت ارسال شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
          navigation.navigate(FORGET_PASS_VERIFICATION_SCREEN, { data })
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
                mobile: ''
              }}
              onSubmit={handleSubmit}
              validationSchema={Schemes.FORGET_PASSWORD_FORM}
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
                    <Text style={styles.text}>
                      شماره موبایل خود را وارد کنید
                    </Text>
                    <InputWithIconAndText
                      name={'mobile'}
                      value={convertToPersianNumbers(values.mobile)}
                      onChangeText={handleChange('mobile')}
                      placeholder={''}
                      onBlur={handleBlur('mobile')}
                      keyboardType={'numeric'}
                      error={values.mobile?.length && errors.mobile}
                      errorText={errors.mobile}
                      showTextError={true}
                      rightIcon={Call}
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
export default ForgotPasswordScreen
