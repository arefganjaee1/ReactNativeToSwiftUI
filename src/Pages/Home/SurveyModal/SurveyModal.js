import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import FormBtn from '../../../Components/FormBtn/FormBtn'
import TextInput from '../../../Components/Input3'
import StarRating from '../../../Components/StarRating'
import { Images } from '../../../Theme'
import styles from './styles'

const SurveyModal = ({ isVisible, setVisible, reviewid }) => {
  //============================STATE==========================
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState(false)
  const [starCount, setStarCount] = useState(0)
  const accToken = useSelector(state => state.accToken.accToken)
  const [loading, setLoading] = useState(false)

  //============================Constants==========================
  const { CloseOrange } = Images
  const toast = useToast()

  //============================Functions==========================

  const handleBack = () => {
    setVisible(false)
    setTextValue('')
  }

  const handleTextInput = value => {
    setTextValue(value)
  }
  const handleSurvey = () => {
    serverRequest()
  }
  const serverRequest = () => {
    setLoading(true)
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const formdata = new FormData()
    formdata.append('rate', starCount)
    formdata.append('text', textValue)
    formdata.append('reviewid', reviewid)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/addreview', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.status === 'ok') {
          setLoading(false)
          setVisible(false)
          setTextValue('')
          toast.show('ارسال نظر با موفقیت انجام شد', {
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
        backdropColor={'#282828'}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
              <CloseOrange />
            </TouchableOpacity>
            <Text style={styles.subTitle}>
              میزان رضایت خود را از نصب اعلام کنید.
            </Text>
          </View>
          <View style={styles.star}>
            <StarRating {...{ starCount, setStarCount }} />
          </View>
          <View style={styles.bottom}>
            <View style={styles.input}>
              <TextInput
                name={'password'}
                value={textValue}
                placeholder={''}
                error={textValue?.length && error}
                errorText={'مقدار وارد شده صحیح نیست'}
                showTextError={true}
                handleValue={handleTextInput}
              />
            </View>
            <FormBtn
              title={'ارسال نظر'}
              disabled={true}
              error={false}
              loading={false}
              handleSubmit={handleSurvey}
              style={[styles.yesBtn]}
              titleStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default SurveyModal
