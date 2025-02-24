import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import { useDevicesApi } from '../../Api/useDevicesApi'
import DrawerMenu from '../../Components/DrawerMenu'
import FormBtn from '../../Components/FormBtn/FormBtn'
import FormInput from '../../Components/FormInput/FormInput'
import Header2 from '../../Components/Header2/Header2'
import SelectMovingType from '../../Components/SelectMovingType'
import { useNetworkStatus } from '../../Hooks/UseNetChecker'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import Schemes from '../../Values/Schemes'
import styles from './EditDeviceStyles'

const EditDeviceScreen = ({ navigation, route }) => {
  //============================STATE==========================
  const [loading, setLoading] = useState(false)
  const [movingType, setMovingType] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [Value, setValue] = useState('')
  const [openSection, setOpenSection] = useState(null)
  //============================Constants==========================
  const { handleGetDevices } = useDevicesApi()
  const token = useSelector(state => state.token.token)
  const isConnected = useNetworkStatus()
  const toast = useToast()
  const { Moving, Car, IMEI } = Images
  const { CAMERA_SCANNER_SCREEN } = CONSTANTS.Routes
  const DeviceInformation = route?.params?.item
  //============================Functions==========================
  const toggleSection = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section))
  }
  useEffect(() => {
    setValue(DeviceInformation?.contact)
    if (DeviceInformation?.category === 'car') {
      setMovingType(1)
    } else if (DeviceInformation?.category === 'motorcycle') {
      setMovingType(2)
    } else setMovingType(1)
  }, [])

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
    const data = {
      uniqueId: DeviceInformation?.uniqueId,
      disabled: DeviceInformation?.disabled,
      groupId: DeviceInformation?.groupId,
      phone: DeviceInformation?.phone,
      model: DeviceInformation?.model,
      contact: DeviceInformation?.contact,
      id: DeviceInformation?.id,
      category:
        movingType === 1 ? 'car' : movingType === 2 ? 'motorcycle' : 'car',
      name: e.deviceName
    }
    EditDevice(data)
  }
  const EditDevice = data => {
    console.log('data >>>', data)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${token}`)
    const raw = JSON.stringify(data)
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch(`https://web.confidentech.net/api/devices/${data.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.id) {
          setLoading(false)
          toast.show('تغییرات با موفقیت اعمال شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
          handleGetDevices()
        }
      })
      .catch(error => console.error(error))
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  const onImeiPress = () => {
    navigation.navigate(CAMERA_SCANNER_SCREEN, { setValue })
  }
  const changeText = val => {
    setValue(val)
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <Formik
          initialValues={{
            deviceName: DeviceInformation?.name,
            movingType: DeviceInformation?.category
          }}
          onSubmit={handleSubmit}
          validationSchema={Schemes.DEVICE_FORM}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            handleBlur,
            setFieldValue
          }) => {
            return (
              <>
                <FormInput
                  name={'deviceName'}
                  value={values.deviceName}
                  onChangeText={handleChange('deviceName')}
                  placeholder={'نام متحرک'}
                  onBlur={handleBlur('deviceName')}
                  keyboardType={''}
                  error={values.deviceName?.length && errors.deviceName}
                  errorText={errors.deviceName}
                  showTextError={true}
                  rightIcon={Car}
                />
                <View style={styles.selectBtn}>
                  <View style={styles.rightSection}>
                    <Text style={styles.title}>{Value}</Text>
                    <IMEI />
                  </View>
                </View>
                <SelectMovingType
                  title='نوع متحرک'
                  RightIcon={Moving}
                  contentHeight={170}
                  setMovingType={value => {
                    setMovingType(value)
                    setFieldValue('movingType', value)
                  }}
                  movingType={movingType}
                  isOpen={openSection === 'movingType'}
                  toggleSection={() => toggleSection('movingType')}
                />
                <FormBtn
                  title={'ویرایش'}
                  disabled={isValid}
                  error={errors}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  style={{ alignSelf: 'Left', marginTop: 38, width: 91 }}
                />
              </>
            )
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}
export default EditDeviceScreen
