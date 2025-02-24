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
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './ForgetPassVerificationStyle'

const ForgetPassVerificationScreen = ({ route, navigation }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [timer, setTimer] = useState(null)
  const [counter, setCounter] = useState(120)
  const [resend, setResend] = useState(true)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })
  //============================Constants==========================
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)
  const mobile = useSelector(state => state.mobile.mobile)
  const toast = useToast()
  const dispatch = useDispatch()
  const userMobile = route.params?.userMobile
  const data = route.params?.data
  const { Logo } = Images
  const CELL_COUNT = 5
  const { NEW_PASSWORD_SCREEN } = CONSTANTS.Routes
  //============================Functions==========================
  const getOtpRequest = data => {
    setLoading(true)
    const formdata = new FormData()
    formdata.append('mobile', mobile)

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
          toast.show('کد با موفقیت ارسال شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        }
      })
      .catch(error => console.error(error))
  }
  useEffect(() => {
    if (value.length == 5) {
      navigation.navigate(NEW_PASSWORD_SCREEN, { value })
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
      setResend(!resend)
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
    setResend(!resend)
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}
export default ForgetPassVerificationScreen
