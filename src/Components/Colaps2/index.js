import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import FormBtn from '../../Components/FormBtn/FormBtn'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import Checkbox from '../Checkbox'
import Spacer from '../Spacer/Spacer'
import styles from './styles'

const Collaps2 = ({
  item,
  handleCreateNotification,
  handleEditNotification,
  handleDeleteNotification,
  editNotificationLoading,
  deleteNotificationLoading,
  createNotificationLoading,
  isOpen,
  toggleSection
}) => {
  //============================STATE==========================
  const loading = false
  const [emaiCheck, setEmaiCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mobileCheck, setMobileCheck] = useState(false)
  const [smsCheck, setSmsCheck] = useState(false)
  const [notificators, setNotificators] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isFirstChange, setIsFirstChange] = useState(true)
  //============================Constants==========================
  const { ArrowDown, ArrowUp } = Images
  const [isCollapsed, setIsCollapsed] = useState(true)
  const translateY = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  //============================Functions==========================
  const toggleCollapse = () => {
    toggleSection()
  }
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start(() => {
      setIsCollapsed(!isOpen)
    })
  }, [isOpen])
  const handleCheckboxToggle = () => {
    if (isFirstChange) {
      setIsChecked(true)
      setIsFirstChange(false)
    }
  }
  const handleSubmit = () => {
    setIsLoading(true)
    loading
    let id = item.id
    if (item.isAlreadyCreated == false) {
      var data = JSON.stringify({
        attributes: item.attributes,
        calendarId: 0,
        always: true,
        type: item.type,
        commandId: 0,
        notificators: notificators
      })
    } else {
      var data = JSON.stringify({
        id: item.id,
        attributes: item.attributes,
        calendarId: 0,
        always: true,
        type: item.type,
        commandId: 0,
        notificators: notificators
      })
    }

    if (item.isAlreadyCreated == false) {
      handleCreateNotification(data)
    }
    if (item.isAlreadyCreated == true) {
      if (notificators == '') {
        handleDeleteNotification(id)
      } else {
        handleEditNotification(data, id)
      }
    }
  }

  useEffect(() => {
    const notificatorsArray = item.notificators
      .split(',')
      .map(value => value.trim())
    if (
      notificatorsArray.includes('firebase') ||
      notificatorsArray.includes('web')
    ) {
      setMobileCheck(true)
    }
    if (notificatorsArray.includes('mail')) {
      setEmaiCheck(true)
    }
    if (notificatorsArray.includes('sms')) {
      setSmsCheck(true)
    }
  }, [item])

  const handleNotificator = () => {
    let notificators = ''
    if (smsCheck) {
      notificators += 'sms'
    }
    if (emaiCheck) {
      if (notificators.length > 0) {
        notificators += ','
      }
      notificators += 'mail'
    }
    if (mobileCheck) {
      if (notificators.length > 0) {
        notificators += ','
      }
      if (item.type === 'alarm') {
        notificators += 'firebase'
      } else {
        notificators += 'firebase'
      }
    }
    setNotificators(notificators)
  }

  useEffect(() => {
    handleNotificator()
  }, [emaiCheck, mobileCheck, smsCheck])
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [
    editNotificationLoading,
    deleteNotificationLoading,
    createNotificationLoading
  ])

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [53, 173]
          })
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerContent}
        onPress={toggleCollapse}
      >
        <View style={styles.iconContainer}>
          {isCollapsed && <ArrowDown />}
          {!isCollapsed && <ArrowUp />}
        </View>
        <View style={styles.rightContainer}>
          {item.isAlreadyCreated && (
            <View style={styles.statusBtnOn}>
              <Text style={styles.statusBtnTextOn}>روشن</Text>
              <View style={styles.dotOn}></View>
            </View>
          )}
          {!item.isAlreadyCreated && (
            <View style={styles.statusBtnOff}>
              <Text style={styles.statusBtnTextOff}>خاموش</Text>
              <View style={styles.dotOff}></View>
            </View>
          )}
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.more}>
        {item.description === 'accident' && (
          <View style={[styles.description, { marginBottom: 5 }]}>
            <Text style={styles.descText}>
              در حالت پیش فرض این هشدارروی مقدار کم قرار دارد.
            </Text>
          </View>
        )}
        {item.description === 'overspeed' && (
          <View style={[styles.description, { marginBottom: 5 }]}>
            <Text style={styles.descText}>
              مقدار پیشفرض ۱۲۰ کیلومتر بر ساعت می باشد.{' '}
            </Text>
          </View>
        )}

        <Spacer style={{ height: 0.5 }} />
        <View style={styles.items}>
          <View style={styles.check}>
            <Text style={styles.title}>ایمیل</Text>
            <Checkbox
              style={styles.checkbox}
              {...{
                check: emaiCheck,
                setCheck: setEmaiCheck,
                handleNotificator
              }}
              onToggle={handleCheckboxToggle}
            />
          </View>
          <View style={styles.check}>
            <Text style={styles.title}>برنامه موبایل</Text>
            <Checkbox
              style={styles.checkbox}
              {...{
                check: mobileCheck,
                setCheck: setMobileCheck,
                handleNotificator
              }}
              onToggle={handleCheckboxToggle}
            />
          </View>
          <View style={styles.check}>
            <Text style={styles.title}>پیامک</Text>
            <Checkbox
              style={styles.checkbox}
              {...{
                check: smsCheck,
                setCheck: setSmsCheck,
                handleNotificator
              }}
              onToggle={handleCheckboxToggle}
            />
          </View>
        </View>
        {/* {item.description && (
          <View style={styles.description}>
            <Text style={[styles.descText]}>
              اعلان سرعت غیر مجاز از طریق پیامک و ایمیل برای شما ارسال می شود.
            </Text>
          </View>
        )} */}

        <View style={styles.submitContainer}>
          <FormBtn
            title={'ثبت'}
            disabled={isChecked}
            loading={isLoading}
            handleSubmit={handleSubmit}
            style={[
              styles.submitBtn,
              isChecked === false
                ? { backgroundColor: Colors.disableButton }
                : { backgroundColor: Colors.green }
            ]}
            titleStyle={styles.btnTitle}
          />
        </View>
      </View>
    </Animated.View>
  )
}

export default Collaps2
