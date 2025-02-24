import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native'
import Colaps1 from '../../Components/Colaps1'
import FormAddressInput from '../../Components/FormAddressInput/FormAddressInput'
import FormBtn from '../../Components/FormBtn/FormBtn'
import Header from '../../Components/Header/Header'
import RadioButton2 from '../../Components/RadioButton2/RadioButton2'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './InformationStyles'

const InformationScreen = ({ navigation }) => {
  //============================STATE==========================
  const loading = false
  const [Tab, setTab] = useState(1)
  //============================Constants==========================
  const { INSTALLER_SCREEN } = CONSTANTS.Routes
  const { Address, Place, Logo } = Images
  //============================Functions==========================
  const modelContent = () => {
    return (
      <View style={[styles.collapsContainer]}>
        <RadioButton2
          onTabbarPress={setTab}
          {...{
            title1: 'شیراز',
            title2: 'اصفهان',
            title3: 'مشهد'
          }}
        />
      </View>
    )
  }
  const handleSubmit = e => {
    navigation.navigate(INSTALLER_SCREEN)
  }
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.dark)
    StatusBar.setTranslucent(true)
    StatusBar.setBarStyle('light-content')
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header {...{ navigation }} />
      <Image source={Logo} style={styles.logoImg} />
      <Text style={styles.title}>ثبت نام</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <KeyboardAvoidingView style={{ width: '100%' }} behavior={'padding'}>
          <Formik
            initialValues={{
              address: ''
            }}
            onSubmit={handleSubmit}
            // validationSchema={Schemes.REGISTER_FORM}
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
                  <Colaps1
                    {...{
                      title: 'شهر',
                      RightIcon: Place,
                      contentHeight: 170
                    }}
                    content={modelContent}
                  />
                  <Colaps1
                    {...{
                      title: 'استان',
                      RightIcon: Place,
                      contentHeight: 170
                    }}
                    content={modelContent}
                  />

                  <FormAddressInput
                    name={'address'}
                    value={values.address}
                    onChangeText={handleChange('address')}
                    placeholder={'ادرس محل سکونت'}
                    onBlur={handleBlur('address')}
                    // keyboardType={'numeric'}
                    error={values.address?.length && errors.address}
                    errorText={errors.address}
                    showTextError={true}
                    rightIcon={Address}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default InformationScreen
