import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Text, View } from 'react-native'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner
} from 'react-native-vision-camera'
import { useDispatch } from 'react-redux'
import { setQRCode } from '../../Stores/actions/QRCodeAction'

const CameraScannerScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { hasPermission, requestPermission } = useCameraPermission()
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes && codes.length > 0) {
        const code = codes[0]
        setIsActive(false)
        const qrCode = code.value
        dispatch(setQRCode(qrCode))
        navigation.goBack()
      }
    }
  })
  const device = useCameraDevice('back')

  useEffect(() => {
    const checkPermissions = async () => {
      const permissionStatus = await requestPermission()
      if (permissionStatus === true) {
        setLoading(false)
      } else {
        setLoading(false)
        setError('دسترسی به دوربین الزامی است')
      }
    }

    checkPermissions()
  }, [requestPermission])

  // Handle loading and error states
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}
      >
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}
      >
        <Text style={{ color: 'white' }}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {device ? (
        <Camera
          style={{ width: '100%', height: '100%' }}
          device={device}
          codeScanner={codeScanner}
          isActive={isActive}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black'
          }}
        >
          <Text style={{ color: 'white' }}>دوربین یافت نشد</Text>
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: Dimensions.get('screen').width / 1.5,
          left: Dimensions.get('screen').width / 5.5,
          width: Dimensions.get('screen').width / 1.5,
          height: Dimensions.get('screen').width / 1.5,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderRadius: 5,
          borderColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: Dimensions.get('screen').width / 1.6,
            height: Dimensions.get('screen').width / 1.6,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'red'
          }}
        ></View>
      </View>
    </View>
  )
}

export default CameraScannerScreen
