import React, { useEffect, useRef, useState } from 'react'
import { Alert, BackHandler, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../Stores/actions/UserDataAction'

const PaymentScreen = ({ route, navigation }) => {
  const paymentUrl = route.params?.url
  const webViewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [loading, setLoading] = useState(true)
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)
  const accToken = useSelector(state => state.accToken.accToken)
  const dispatch = useDispatch()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress
    )

    return () => {
      backHandler.remove()
    }
  }, [canGoBack])

  const handleBackButtonPress = () => {
    if (canGoBack) {
      webViewRef.current.goBack()
      return true
    } else {
      Alert.alert('خروج', 'آیا میخواهید از صفحه پرداخت خارج شوید؟', [
        {
          text: 'خیر',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'بله',
          onPress: () => navigation.goBack()
        }
      ])
      return true
    }
  }
  const splashServerRequest = () => {
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
        dispatch(setUserInfo(result))
      })
      .catch(error => console.error(error))
  }
  const onNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack)
    const { url } = navState

    if (url.includes('paymentsuccess')) {
      navigation.goBack()
      splashServerRequest()
      Alert.alert('پرداخت با موفقیت انجام شد', '', [
        {
          text: 'باشه'
        }
      ])
    } else if (url.includes('paymentfailed')) {
      Alert.alert('پرداخت ناموفق بود', '', [
        {
          text: 'تلاش مجدد',
          onPress: () => {} // Stay on the payment screen
        },
        {
          text: 'لغو',
          onPress: () => navigation.goBack() // Navigate back to the recharge screen
        }
      ])
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        onNavigationStateChange={onNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState={true}
      />
    </View>
  )
}

export default PaymentScreen
