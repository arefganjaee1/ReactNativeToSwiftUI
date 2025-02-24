import moment from 'jalali-moment'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { useSelector } from 'react-redux'
import DrawerMenu from '../../Components/DrawerMenu'
import Header2 from '../../Components/Header2/Header2'
import Spacer from '../../Components/Spacer/Spacer'
import { convertEnglishToPersianNumber } from '../../Helpers/numberConverter2'
import CONSTANTS from '../../Values/Constants'
import styles from './SubscriptionRechargeStyles'

const SubscriptionRechargeScreen = ({ navigation }) => {
  //============================STATE==========================
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [durationInDays, setDurationInDays] = useState(null)
  //============================Constants==========================
  const userData = useSelector(state => state.userData.userData)
  const expirationDate = userData?.expirationsubscriptiontime
  const subscriptionplans = userData?.subscriptionplans
  const { PAYMENT_SCREEN } = CONSTANTS.Routes
  const accToken = useSelector(state => state.accToken.accToken)
  //============================Functions==========================
  useEffect(() => {
    if (!expirationDate) {
      setDurationInDays(null)
    } else {
      try {
        const parsedDate = moment.from(expirationDate, 'fa', 'DD-MMM-YYYY')
        if (!parsedDate.isValid()) {
          console.log('Invalid expiration date format.')
          setDurationInDays(null)
        } else {
          const now = moment().locale('fa')
          const daysUntilExpiration = parsedDate.diff(now, 'days')
          setDurationInDays(daysUntilExpiration)
        }
      } catch (error) {
        setDurationInDays(null)
      }
    }
  }, [expirationDate])
  const convertToPersianNumbers = num => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return num.toString().replace(/[0-9]/g, w => persianNumbers[+w])
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  const payment = value => {
    const url = `https://acc.confidentech.net/api/payment2/${value}?token=${accToken}`
    console.log('payment url: ', url)
    navigation.navigate(PAYMENT_SCREEN, { url })
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />

      <Text style={styles.title}>روزهای مانده از اشتراک</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <View style={styles.circularContainer}>
          <CircularProgress
            value={durationInDays ? durationInDays : 730}
            radius={73}
            duration={2000}
            maxValue={730}
            progressValueColor={'#4BB543'}
            inActiveStrokeColor={'#ffffff'}
            activeStrokeColor={'#4BB543'}
            activeStrokeWidth={15}
            inActiveStrokeOpacity={0.3}
            circleBackgroundColor={'transparent'}
            initialValue={0}
            title={'روز'}
            titleColor={'#4BB543'}
            titleStyle={styles.circularStyle}
            showProgressValue={false}
          />
          <View style={styles.absoluteFillObject}>
            <Text style={styles.customText}>
              {convertToPersianNumbers(
                isNaN(durationInDays) || durationInDays == null
                  ? 730
                  : durationInDays
              )}
            </Text>
          </View>
        </View>
        <View style={styles.buyCharge}>
          <Text style={styles.title}>خرید اشتراک</Text>
          {subscriptionplans?.map(item => (
            <View style={styles.planContainer}>
              <Text style={styles.planTitle}>
                {item?.duration === '3'
                  ? 'سه'
                  : item?.duration === '6'
                  ? 'شش'
                  : item?.duration === '12'
                  ? 'دوازده'
                  : item?.duration}{' '}
                ماهه
              </Text>
              <Spacer {...{ style: styles.spacer }} />
              <Text style={styles.planTitle}>
                {convertEnglishToPersianNumber(item?.fee)}
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => payment(item?.id)}
                >
                  <Text style={styles.planTitle}>خرید {'>'} </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SubscriptionRechargeScreen
