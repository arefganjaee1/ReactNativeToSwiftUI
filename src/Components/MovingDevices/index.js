import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import FormBtn from '../../Components/FormBtn/FormBtn'
import { convertEnglishToPersianNumber } from '../../Helpers/numberConverter2'
import Images from '../../Theme/Images'
import styles from './style'

const MovingDevices = ({
  setSuccessVisible,
  setGetDeviceVisible,
  handleGetDevices,
  getMovingDevicesList,
  movingDevices
}) => {
  //============================State==========================
  const [acceptLoading, setAcceptLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)
  //============================Constant==========================
  const accToken = useSelector(state => state.accToken.accToken)
  const toast = useToast()
  const { Alert } = Images
  //============================Functions==========================
  //Accept Device
  const acceptDevice = deviceid => {
    setAcceptLoading(true)
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const formdata = new FormData()
    formdata.append('traccardeviceid', deviceid)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }
    fetch(
      'https://acc.confidentech.net/api/acceptmovingrequest',
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('result >>', result)
        if (result.status === 'accepted successfully') {
          setAcceptLoading(false)
          toast.show('دریافت دستگاه با موفقیت انجام شد', {
            type: 'success',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
          getMovingDevicesList()
          handleGetDevices()
          // setGetDeviceVisible(true)
        } else {
          setAcceptLoading(false)
          toast.show('خطایی رخ داده است', {
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
  //Reject Device
  const rejectDevice = deviceid => {
    setRejectLoading(true)
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const formdata = new FormData()
    formdata.append('traccardeviceid', deviceid)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch(
      'https://acc.confidentech.net/api/rejectmovingrequest',
      requestOptions
    )
      .then(response => {
        // Check if response is JSON
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          return response.json() // Parse JSON only if it's valid
        } else {
          return response.text() // If not JSON, return as text
        }
      })
      .then(data => {
        console.log('result >>', data)

        // Check if the response is JSON and process it
        if (
          typeof data === 'object' &&
          data !== null &&
          data?.status === '0k'
        ) {
          setRejectLoading(false)
          toast.show('انتقال دستگاه لغو شد', {
            type: 'warning',
            placement: 'top',
            duration: 5000,
            offset: 100,
            animationType: 'zoom-in'
          })
        } else {
          setRejectLoading(false)
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
        setRejectLoading(false)
        console.error('Error:', error)
        toast.show('خطایی رخ داده است', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      })
  }

  return (
    <View style={styles.container}>
      {movingDevices?.map((item, index) => (
        <View style={styles.transferOfOwnershipItem} key={item.id || index}>
          <Text style={styles.transferOfOwnershipItemText}>
            {`آیا مالکیت ${
              item.devicename
            }  را با شماره سریال ${convertEnglishToPersianNumber(
              item.imei
            )}  می پذیرید؟`}
          </Text>
          <View style={styles.rowBtn}>
            <FormBtn
              title={'بله'}
              disabled={true}
              error={false}
              loading={acceptLoading}
              handleSubmit={() => acceptDevice(item?.deviceid)}
              style={styles.submitBtn}
              titleStyle={{ fontSize: 12, alignSelf: 'center' }}
            />
            <FormBtn
              title={'خیر'}
              disabled={true}
              error={false}
              loading={rejectLoading}
              handleSubmit={() => rejectDevice(item?.deviceid)}
              style={styles.cancelBtn}
              titleStyle={{ fontSize: 12, alignSelf: 'center' }}
            />
          </View>
        </View>
      ))}
      {movingDevices?.length === 0 && (
        <View style={styles.empty}>
          <Alert />
          <Text style={styles.transferOfOwnershipText}>دستگاهی یافت نشد</Text>
        </View>
      )}
    </View>
  )
}

export default MovingDevices
