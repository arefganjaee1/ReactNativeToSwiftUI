import { Formik } from 'formik'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'
import FormBtn from '../../Components/FormBtn/FormBtn'
import Header from '../../Components/Header/Header'
import InputWithIconAndText from '../../Components/InputWithIconAndText'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './SignUpStyle'

const SignUpScreen = ({ navigation }) => {
  //============================STATE==========================
  const loading = false
  //============================Constants==========================
  const { VERIFICATION_SCREEN } = CONSTANTS.Routes
  const { Call, Logo } = Images
  //============================Functions==========================
  const handleSubmit = e => {
    navigation.navigate(VERIFICATION_SCREEN)
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
          <Header {...{ navigation }} />
          <Logo style={styles.logoImg} />
          <Text style={styles.title}>ثبت نام</Text>
          <View style={styles.top}>
            <View style={styles.mainContent}>
              <Formik
                initialValues={{
                  user: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={Schemes.SIGN_UP_FORM}
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
                        value={values.mobile}
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default SignUpScreen
