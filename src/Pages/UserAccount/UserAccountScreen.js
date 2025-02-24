import { Formik } from 'formik'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import DrawerMenu from '../../Components/DrawerMenu'
import FormBtn from '../../Components/FormBtn/FormBtn'
import FormInput from '../../Components/FormInput/FormInput'
import Header2 from '../../Components/Header2/Header2'
import { convertEnglishToPersianNumber } from '../../Helpers/numberConverter2'
import { useNetworkStatus } from '../../Hooks/UseNetChecker'
import { setUserInfo } from '../../Stores/actions/UserDataAction'
import Images from '../../Theme/Images'
import Schemes from '../../Values/Schemes'
import styles from './UserAccountStyles'

const UserAccountScreen = ({ navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  //============================Constants==========================
  const dispatch = useDispatch()
  const isConnected = useNetworkStatus()
  const toast = useToast()
  const { Union, Call, Mail } = Images
  const userData = useSelector(state => state.userData.userData)
  const accToken = useSelector(state => state.accToken.accToken)
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)
  //============================Functions==========================
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
    const data = {
      username: values.name,
      useremail: values.email,
      usermobile: values.phone
    }
    serverRequest(data)
  }

  const serverRequest = data => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const formdata = new FormData()
    formdata.append('name', data.username)
    formdata.append('email', data.useremail)
    formdata.append('fcmtoken', fcmToken)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/edituser', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.status === 'ok') {
          setLoading(false)
          dispatch(setUserInfo(data))
          toast.show('تغییر اطلاعات حساب کاربری با موفقیت انجام شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else {
          setLoading(false)
          toast.show('خطایی رخ داده است', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        }
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
        toast.show('خطایی رخ داده است', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      })
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />
      <Text style={styles.headerTitle}>حساب کاربری</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <KeyboardAvoidingView style={{ width: '100%' }} behavior={'padding'}>
          <Formik
            initialValues={{
              name: userData?.username,
              email: userData?.useremail,
              phone: userData?.usermobile
            }}
            onSubmit={handleSubmit}
            validationSchema={Schemes.USER_ACCOUNT_FORM}
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
                    name={'name'}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder={'نام'}
                    onBlur={handleBlur('name')}
                    // keyboardType={'numeric'}
                    error={values.name?.length && errors.name}
                    errorText={errors.name}
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
                  <View style={styles.selectBtn}>
                    <View style={styles.rightSection}>
                      <Text style={styles.title}>
                        {convertEnglishToPersianNumber(userData?.usermobile)}
                      </Text>
                      <Call />
                    </View>
                  </View>
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default UserAccountScreen
