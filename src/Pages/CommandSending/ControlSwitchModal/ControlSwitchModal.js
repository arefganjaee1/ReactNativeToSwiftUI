import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import FormBtn from '../../../Components/FormBtn/FormBtn'
import TextInput from '../../../Components/Input'
import { Images } from '../../../Theme'
import styles from './styles'

const ControlSwitchModal = ({
  isVisible,
  setVisible,
  RelayConnect,
  RelayDisconnect,
  relay
}) => {
  //============================STATE==========================
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState(false)
  const [isOk, setIsOk] = useState(false)
  //============================Constants==========================
  const { CloseOrange } = Images
  //============================Functions==========================
  const handleSubmit = () => {
    if (textValue == 70) {
      setIsOk(true)
      setError(false)
    } else {
      setError(true)
    }
  }
  const handleBack = () => {
    setIsOk(false)
    setVisible(false)
    setTextValue('')
  }

  const handleTextInput = value => {
    setTextValue(value)
  }
  const handleYes = () => {
    if (relay == 0) {
      RelayDisconnect()
      setVisible(false)
    } else if (relay == 1) {
      RelayConnect()
      setVisible(false)
    }
    setIsOk(false)
    setTextValue('')
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
              قطع و وصل کردن سوییچ از راه دور - رله قطع کن
            </Text>
          </View>

          {isOk === false && (
            <View style={styles.center}>
              <View
                style={{
                  height: 80,
                  width: 220,
                  backgroundColor: '#414141',
                  borderRadius: 5
                }}
              >
                <View style={styles.topSection}>
                  <Text style={styles.itemText}>50</Text>
                  <Text style={styles.itemText2}>+</Text>
                  <Text style={styles.itemText}>20</Text>
                  <Text style={styles.itemText2}>=</Text>
                  <View style={styles.input}>
                    <TextInput
                      name={'password'}
                      value={textValue}
                      placeholder={''}
                      keyboardType={'numeric'}
                      error={textValue?.length && error}
                      errorText={'مقدار وارد شده صحیح نیست'}
                      showTextError={true}
                      handleValue={handleTextInput}
                    />
                  </View>
                </View>
                <View>
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
            </View>
          )}

          <View style={styles.bottom}>
            <Text style={styles.subTitle}>
              اخطار: در صورت اجرای این دستور متحرک شما بلافاصله خاموش می شود. با
              اگاهی از خطرات ناشی از این موضوع به دلیل احتمال حرکت خودرو آیا از
              اجرای این دستور اطمینان دارید؟
            </Text>
            <FormBtn
              title={'بله'}
              disabled={isOk}
              error={false}
              loading={false}
              handleSubmit={handleYes}
              style={[
                styles.yesBtn,
                isOk === false && { backgroundColor: '#979797' }
              ]}
              titleStyle={{
                fontSize: 10,
                alignSelf: 'center',
                borderRadius: 10
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default ControlSwitchModal
