import React from 'react'
import { Linking, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import FormBtn from '../../../Components/FormBtn/FormBtn'
import styles from './styles'

const ForceUpdateModal = ({ isVisible, setVisible, link }) => {
  //============================STATE==========================
  //============================Constants==========================
  //============================Functions==========================

  const handleUpdate = () => {
    setVisible(false)
    const url = link
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
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
            <Text style={styles.subTitle}>
              اپلیکیشن شما نیاز به بروز رسانی دارد لطفا از طریق دکمه زیر اقدام
              به بروز رسانی نمایید.
            </Text>
          </View>

          <View style={styles.bottom}>
            <FormBtn
              title={'بروز رسانی'}
              disabled={true}
              error={false}
              loading={false}
              handleSubmit={handleUpdate}
              style={[styles.yesBtn]}
              titleStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default ForceUpdateModal
