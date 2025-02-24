import { Formik } from 'formik'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import FormBtn from '../../../Components/FormBtn/FormBtn'
import InputWithIconAndText from '../../../Components/InputWithIconAndText'
import { Colors, Images } from '../../../Theme'
import Schemes from '../../../Values/Schemes'
import styles from './styles'

const DevicesModal = ({ isVisible, setVisible, transferDeviceId }) => {
  //============================STATE==========================
  const [pages, setPages] = useState(1)
  const [mobile, setMobile] = useState()
  const [loading, setLoading] = useState(false)
  //============================Constants==========================
  const { Close, Call } = Images
  const accToken = useSelector(state => state.accToken.accToken)
  const toast = useToast()
  //============================Functions==========================
  const handleSubmit = () => {
    setPages(2)
  }
  const changeText = val => {
    setMobile(val)
  }

  const handleTransferDevice = () => {
    setLoading(true)
    serverRequest()
  }

  const serverRequest = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const formdata = new FormData()
    formdata.append('traccardeviceid', transferDeviceId)
    formdata.append('receivermobile', mobile)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch(
      'https://acc.confidentech.net/api/movingdevicerequest',
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('result >>', result)
        if (result?.status === 'ok') {
          setLoading(false)
          setVisible(false)
          setPages(1)
          setMobile()
          toast.show('درخواست انتقال با موفقیت ثبت شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else {
          setLoading(false)
          setVisible(false)
          setPages(1)
          setMobile()
          toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
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
  // const serverRequest = () => {
  //   const myHeaders = new Headers()
  //   myHeaders.append('acctoken', accToken)
  //   const formdata = new FormData()
  //   formdata.append('traccardeviceid', transferDeviceId)
  //   formdata.append('receivermobile', mobile)

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: 'follow'
  //   }
  //   fetch(
  //     'https://acc.confidentech.net/api/movingdevicerequest',
  //     requestOptions
  //   )
  //     .then(result => {
  //       console.log('result',result)
  //       const res = result.json()
  //       const response = JSON.parse(res)
  //       if (response?.status === 'ok') {
  //         setLoading(false)
  //         setVisible(false)
  //         setPages(1)
  //         setMobile()
  //         toast.show('درخواست انتقال با موفقیت ثبت شد', {
  //           type: 'success',
  //           placement: 'top',
  //           duration: 5000,
  //           offset: 100,
  //           animationType: 'zoom-in'
  //         })
  //       } else {
  //         setLoading(false)
  //         setVisible(false)
  //         setPages(1)
  //         setMobile()
  //         toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
  //           type: 'danger',
  //           placement: 'top',
  //           duration: 5000,
  //           offset: 100,
  //           animationType: 'zoom-in'
  //         })
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setVisible(false)
  //       setLoading(false)
  //       setPages(1)
  //       setMobile()
  //       toast.show('خطایی رخ داده است لطفا مجدد سعی نمایید', {
  //         type: 'danger',
  //         placement: 'top',
  //         duration: 5000,
  //         offset: 100,
  //         animationType: 'zoom-in'
  //       })
  //     })
  // }
  const handleBack = () => {
    setPages(1)
    setVisible(false)
  }

  return (
    <View>
      <Modal
        hasBackdrop={true}
        isVisible={isVisible}
        avoidKeyboard
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropColor={Colors.modalBackground}
      >
        {pages === 1 && (
          <View style={styles.container}>
            <View style={styles.top}>
              <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
                <Close />
              </TouchableOpacity>
              <Text style={styles.subTitle}>
                شماره موبایل گیرنده را وارد کنید{' '}
              </Text>
            </View>
            <View style={styles.center}>
              <Formik
                initialValues={{
                  mobile: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={Schemes.TRANSFER_DEVICE_FORM}
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
                    <InputWithIconAndText
                      name={'mobile'}
                      value={mobile}
                      onChangeText={e => changeText(e)}
                      placeholder={''}
                      onBlur={handleBlur('mobile')}
                      keyboardType={'numeric'}
                      error={values.mobile?.length && errors.mobile}
                      errorText={errors.mobile}
                      showTextError={true}
                      rightIcon={Call}
                      Container={{ height: 42 }}
                      containerStyle={{ height: 42 }}
                      inputContainerStyle={{ height: 42 }}
                    />
                  )
                }}
              </Formik>
            </View>
            <View style={styles.bottom}>
              <FormBtn
                title={'ثبت'}
                disabled={true}
                error={false}
                loading={false}
                handleSubmit={handleSubmit}
                style={styles.submitBtn}
                titleStyle={{ fontSize: 10, alignSelf: 'center' }}
              />
            </View>
          </View>
        )}
        {pages === 2 && (
          <View style={styles.container}>
            <View style={styles.top}>
              <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={styles.center}>
              <Text style={styles.subTitle}>
                {`دستگاه شما بعد از انتقال از لیست متحرک های شما حذف خواهد شد. آیا از انتقال دستگاه مورد نظر به شماره تلفن ${mobile} اطمینان دارید؟`}
              </Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.rowBtn}>
                <FormBtn
                  title={'بله'}
                  disabled={true}
                  error={false}
                  loading={loading}
                  loadingSize={10}
                  handleSubmit={handleTransferDevice}
                  style={styles.yesBtn}
                  titleStyle={{ fontSize: 10, alignSelf: 'center' }}
                />
                <FormBtn
                  title={'خیر'}
                  disabled={true}
                  error={false}
                  loading={false}
                  handleSubmit={handleBack}
                  style={styles.noBtn}
                  titleStyle={{ fontSize: 10, alignSelf: 'center' }}
                />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  )
}
export default DevicesModal
