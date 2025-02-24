import DatePicker from '@mohamadkh75/react-native-jalali-datepicker'
import moment from 'moment-jalaali'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useToast } from 'react-native-toast-notifications'
import FormBtn from '../../../Components/FormBtn/FormBtn'
import { Images } from '../../../Theme'
import styles from './styles'

const CalendarModal = ({
  isVisible,
  setVisible,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  const toast = useToast()
  const { Close } = Images
  const currentDate = moment().format('jYYYY/jMM/jDD')

  const handleStartDateChange = date => {
    console.log('startDate >>>', date)
    setStartDate(date)
  }
  const handleEndDateChange = date => {
    setEndDate(date)
  }
  const [pages, setPages] = useState(1)

  const handleSubmit = () => {
    if (pages === 1) {
      if (startDate == null) {
        toast.show('لطفا یک روز را انتخاب کنید', {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else {
        setPages(2)
      }
    } else {
      if (endDate == null) {
        toast.show('لطفا یک روز را انتخاب کنید', {
          type: 'warning',
          placement: 'top',
          duration: 5000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else {
        setPages(1)
        setVisible(false)
      }
    }
  }

  const handleBack = () => {
    setStartDate(null)
    setEndDate(null)
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
        backdropColor={'transparent'}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {pages === 1 && (
              <View>
                <Text>تاریخ شروع {startDate}</Text>
                <DatePicker
                  style={{ width: 300, height: 350, backgroundColor: 'white' }}
                  mode='jalali'
                  onDateChange={handleStartDateChange}
                  maxDate={currentDate}
                  selected={moment().format('jYYYY/jMM')}
                  yearMonthTextStyle={{
                    fontSize: 22,
                    // color: '#4bcffa',
                    textAlign: 'center', // Center align text explicitly
                    writingDirection: 'ltr' // Prevent mirroring
                  }}
                  dayTextStyle={{
                    fontSize: 18,
                    textAlign: 'center', // Ensure numbers are centered
                    writingDirection: 'ltr' // Correct direction
                  }}
                  headerContainerStyle={{
                    height: '15%',
                    writingDirection: 'ltr' // Corrects text alignment for the header
                  }}
                  backIconStyle={{
                    width: 20,
                    height: 20,
                    resizeMode: 'center',
                    // tintColor: '#808e9b',
                    transform: [{ scaleX: -1 }] // Flip the back icon for RTL
                  }}
                  nextIconStyle={{
                    width: 20,
                    height: 20,
                    resizeMode: 'center',
                    // tintColor: '#4bcffa',
                    transform: [{ scaleX: -1 }] // Flip the next icon for RTL
                  }}
                />
              </View>
            )}
            {pages === 2 && (
              <View>
                <Text>تاریخ پایان {endDate}</Text>
                <DatePicker
                  style={{ width: 300, height: 350, backgroundColor: 'white' }}
                  mode='jalali'
                  onDateChange={handleEndDateChange}
                  maxDate={currentDate}
                  selected={moment().format('jYYYY/jMM')}
                />
              </View>
            )}
            <FormBtn
              title={pages === 1 ? 'بعدی' : 'تایید'}
              disabled={true}
              error={false}
              loading={false}
              handleSubmit={handleSubmit}
              style={styles.yesBtn}
              titleStyle={{ fontSize: 10, alignSelf: 'center' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default CalendarModal
