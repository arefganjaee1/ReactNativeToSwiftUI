import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import FormBtn from '../../Components/FormBtn/FormBtn'
import { Images } from '../../Theme'
import styles from './styles'

const ExitModal = ({ isVisible, setVisible, onExitPress }) => {
  const { Close2 } = Images
  const handleBack = () => {
    setVisible(false)
  }
  const handleYes = () => {
    onExitPress()
    setVisible(false)
  }
  const handleNo = () => {
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
        backdropColor={'#282828'}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
              <Close2 />
            </TouchableOpacity>
            <Text style={styles.title}>آیا می خواهیدخارج شوید؟</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.rowBtn}>
              <FormBtn
                title={'بله'}
                disabled={true}
                error={false}
                loading={false}
                handleSubmit={handleYes}
                style={styles.yesBtn}
                titleStyle={{ fontSize: 10, alignSelf: 'center' }}
              />
              <FormBtn
                title={'خیر'}
                disabled={true}
                error={false}
                loading={false}
                handleSubmit={handleNo}
                style={styles.noBtn}
                titleStyle={{ fontSize: 10, alignSelf: 'center' }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default ExitModal
