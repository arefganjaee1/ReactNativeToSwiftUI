import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import * as Yup from 'yup' // For validation
import { useDevicesApi } from '../../Api/useDevicesApi'
import { useNetworkStatus } from '../../Hooks/UseNetChecker'
import { navigateAndReset } from '../../Services/NavigationService'
import { Colors, Fonts } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import FormAddressInput from '../FormAddressInput/FormAddressInput'
import FormBtn from '../FormBtn/FormBtn'
import FormInput from '../FormInput/FormInput'
import IMEIInput from '../IMEIInput/IMEIInput'
import SelectMovingType from '../SelectMovingType'
import SelectWAyToInstall from '../SelectWAyToInstall'
import styles from './style'

const AddDeviceForm2 = ({ navigation }) => {
  //============================State==========================
  const [loading, setLoading] = useState(false)
  const [Value, setValue] = useState('')
  const [wayToInstall, setWayToInstall] = useState(null)
  const [movingType, setMovingType] = useState(1)
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [provincesList, setProvincesList] = useState([])
  const [cityList, setCityList] = useState([])
  const [openSection, setOpenSection] = useState(null)
  //============================Constant==========================
  const { handleGetDevices } = useDevicesApi()
  const isConnected = useNetworkStatus()
  const accToken = useSelector(state => state.accToken.accToken)
  const toast = useToast()
  const { CAMERA_SCANNER_SCREEN, HOME_SCREEN } = CONSTANTS.Routes
  const { WayToInstall, Moving, Car, Address, Place, ArrowDown } = Images
  const provinceSelectorRef = useRef(null)
  const citySelectorRef = useRef(null)
  const qrCode = useSelector(state => state.QRCode.QRCode)
  //============================Functions==========================
  useEffect(() => {
    getProvinces()
  }, [])
  useEffect(() => {
    getCity()
  }, [selectedProvince])
  const getProvinces = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/provieces', requestOptions)
      .then(response => response.json())
      .then(result => {
        const provinces = result?.provieces?.map(province => ({
          key: String(province.id),
          label: province.name
        }))
        setProvincesList(provinces)
      })
      .catch(error => console.error(error))
  }
  const getCity = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const formdata = new FormData()
    formdata.append('provinceid', selectedProvince?.key)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/proviencescities', requestOptions)
      .then(response => response.json())
      .then(result => {
        const cities = result?.proviecescities?.map(city => ({
          key: String(city.id),
          label: city.name
        }))
        setCityList(cities)
      })
      .catch(error => console.error(error))
  }
  useEffect(() => {
    setValue(qrCode)
  }, [qrCode])

  const onSelectProvince = () => {
    provinceSelectorRef.current.open()
  }

  const onSelectCity = () => {
    citySelectorRef.current.open()
  }

  const onImeiPress = () => {
    navigation.navigate(CAMERA_SCANNER_SCREEN)
  }
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
      deviceName: values.deviceName,
      IMEI: values.IMEI,
      address: values.address
    }
    serverRequest(data)
  }

  const serverRequest = data => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const formdata = new FormData()
    formdata.append('devicename', data.deviceName)
    formdata.append('imei', data.IMEI)
    formdata.append('vehicletype', '1')
    formdata.append('category', movingType == 1 ? 'car' : 'motorcycle')
    formdata.append('isneedinstaller', wayToInstall)
    formdata.append('provinceid', selectedProvince?.key || '1')
    formdata.append('cityid', selectedCity?.key || '1')
    formdata.append('address', data.address)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }
    fetch('https://acc.confidentech.net/api/adddeviceuser', requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false)
        if (result.status === 'ok') {
          handleGetDevices()
          toast.show('ثبت دستگاه با موفقیت انجام شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
          navigateAndReset(HOME_SCREEN)
        } else if (result.status === 'not found') {
          toast.show('سریال دستگاه اشتباه است', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else {
          toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        }
      })
      .catch(error => {
        setLoading(false)
        toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
        console.error(error)
      })
  }

  const toggleSection = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section))
  }
  const getValidationSchema = () => {
    return wayToInstall === 1 ? validationSchema1 : validationSchema2
  }
  const validationSchema1 = Yup.object().shape({
    deviceName: Yup.string().required('نام دستگاه الزامی است'),
    IMEI: Yup.string()
      .required('شماره سریال الزامی است')
      .min(10, 'کد IMEIباید ۱۰ رقم باشد')
      .max(10, 'کد IMEIباید ۱۰ رقم باشد'),
    wayToInstall: Yup.number().required('روش نصب الزامی است'),
    selectedProvince: Yup.object().required('استان الزامی است'),
    selectedCity: Yup.object().required('شهر الزامی است'),
    address: Yup.string().required('آدرس الزامی است')
  })
  const validationSchema2 = Yup.object().shape({
    deviceName: Yup.string().required('نام دستگاه الزامی است'),
    IMEI: Yup.string()
      .required('شماره سریال الزامی است')
      .min(10, 'کد IMEIباید ۱۰ رقم باشد')
      .max(10, 'کد IMEIباید ۱۰ رقم باشد'),
    wayToInstall: Yup.number().required('روش نصب الزامی است')
  })

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          deviceName: '',
          address: '',
          IMEI: Value,
          wayToInstall: wayToInstall,
          movingType: movingType,
          selectedProvince: selectedProvince?.label,
          selectedCity: selectedCity?.label
        }}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          handleBlur,
          setFieldValue
        }) => (
          <>
            <FormInput
              name='deviceName'
              value={values.deviceName}
              onChangeText={handleChange('deviceName')}
              placeholder='نام متحرک'
              onBlur={handleBlur('deviceName')}
              error={values.deviceName?.length && errors.deviceName}
              errorText={errors.deviceName}
              showTextError={true}
              rightIcon={Car}
            />
            <IMEIInput
              name='IMEI'
              value={values.IMEI}
              onChangeText={text => setFieldValue('IMEI', text)}
              placeholder='ورود شماره سریال یا بارکد'
              onBlur={handleBlur('IMEI')}
              keyboardType='numeric'
              error={values.IMEI?.length && errors.IMEI}
              errorText={errors.IMEI}
              showTextError={true}
              handlePress={onImeiPress}
            />
            <SelectWAyToInstall
              title='روش نصب'
              RightIcon={WayToInstall}
              contentHeight={170}
              setWayToInstall={value => {
                setWayToInstall(value)
                setFieldValue('wayToInstall', value)
              }}
              wayToInstall={wayToInstall}
              isOpen={openSection === 'wayToInstall'}
              toggleSection={() => toggleSection('wayToInstall')}
            />
            {errors.wayToInstall && (
              <Text style={styles.errorText}>{errors.wayToInstall}</Text>
            )}
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
            {errors.movingType && (
              <Text style={styles.errorText}>{errors.movingType}</Text>
            )}
            {wayToInstall === 1 && (
              <>
                <TouchableOpacity
                  onPress={onSelectProvince}
                  activeOpacity={0.8}
                  style={styles.selectBtn}
                >
                  <View style={styles.leftSection}>
                    <ArrowDown />
                  </View>
                  <View style={styles.rightSection}>
                    <Text
                      style={[
                        styles.title,
                        selectedProvince
                          ? { color: Colors.light }
                          : { color: Colors.grayText2 }
                      ]}
                    >
                      {selectedProvince?.label ?? 'استان'}
                    </Text>
                    <Place />
                  </View>
                </TouchableOpacity>
                <ModalSelector
                  ref={provinceSelectorRef}
                  data={provincesList}
                  initValue='Select something'
                  onChange={option => {
                    setSelectedProvince(option)
                    setFieldValue('selectedProvince', option)
                    provinceSelectorRef.current.close()
                  }}
                  cancelText='انصراف'
                  optionTextStyle={{ color: Colors.light, ...Fonts.text_14 }}
                  optionStyle={{ backgroundColor: Colors.menueBackground }}
                  optionContainerStyle={{
                    backgroundColor: Colors.menueBackground,
                    borderBottomWidth: 0
                  }}
                  cancelContainerStyle={{
                    borderRadius: 50,
                    width: 100,
                    alignSelf: 'center'
                  }}
                  cancelStyle={{
                    backgroundColor: Colors.orange,
                    borderRadius: 50
                  }}
                  cancelTextStyle={{ color: Colors.light, ...Fonts.text_14 }}
                  customSelector={<></>} // This ensures the default button is not rendered
                />
                <TouchableOpacity
                  onPress={onSelectCity}
                  activeOpacity={0.8}
                  style={styles.selectBtn}
                >
                  <View style={styles.leftSection}>
                    <ArrowDown />
                  </View>
                  <View style={styles.rightSection}>
                    <Text
                      style={[
                        styles.title,
                        selectedCity
                          ? { color: Colors.light }
                          : { color: Colors.grayText2 }
                      ]}
                    >
                      {selectedCity?.label ?? 'شهر'}
                    </Text>
                    <Place />
                  </View>
                </TouchableOpacity>
                <ModalSelector
                  ref={citySelectorRef}
                  data={cityList}
                  initValue='Select something'
                  onChange={option => {
                    setSelectedCity(option)
                    setFieldValue('selectedCity', option)
                    citySelectorRef.current.close()
                  }}
                  cancelText='انصراف'
                  optionTextStyle={{ color: Colors.light, ...Fonts.text_14 }}
                  optionStyle={{ backgroundColor: Colors.menueBackground }}
                  optionContainerStyle={{
                    backgroundColor: Colors.menueBackground,
                    borderBottomWidth: 0
                  }}
                  cancelContainerStyle={{
                    borderRadius: 50,
                    width: 100,
                    alignSelf: 'center'
                  }}
                  cancelStyle={{
                    backgroundColor: Colors.orange,
                    borderRadius: 50
                  }}
                  cancelTextStyle={{ color: Colors.light, ...Fonts.text_14 }}
                  customSelector={<></>} // This ensures the default button is not rendered
                />
                <FormAddressInput
                  name='address'
                  value={values.address}
                  onChangeText={handleChange('address')}
                  placeholder='آدرس محل سکونت'
                  onBlur={handleBlur('address')}
                  error={values.address?.length && errors.address}
                  errorText={errors.address}
                  showTextError={true}
                  rightIcon={Address}
                />
              </>
            )}
            <FormBtn
              title={'افزودن'}
              disabled={isValid}
              error={errors}
              loading={loading}
              handleSubmit={handleSubmit}
              style={{ alignSelf: 'Left', marginTop: 38, width: 91 }}
            />
          </>
        )}
      </Formik>
    </View>
  )
}

export default AddDeviceForm2
