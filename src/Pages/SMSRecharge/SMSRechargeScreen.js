import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import ButtonTab4 from '../../Components/ButtonTab4/ButtonTab4'
import DrawerMenu from '../../Components/DrawerMenu'
import FormBtn from '../../Components/FormBtn/FormBtn'
import Header2 from '../../Components/Header2/Header2'
import Input2 from '../../Components/Input2' // Ensure Input2 component is correctly imported
import CONSTANTS from '../../Values/Constants'
import styles from './SMSRechargeStyles'

const formatNumber = number => {
  const numericValue = number.replace(/[^\d]/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const convertEnglishToPersianNumber = number => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return String(number).replace(/\d/g, digit => persianDigits[digit])
}
const convertPersianToEnglishNumber = number => {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  return String(number).replace(
    /[\u06F0-\u06F9]/g,
    digit => englishDigits[digit.charCodeAt(0) - 0x06f0]
  )
}

const SMSRechargeScreen = ({ navigation }) => {
  //============================STATE==========================
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [value, setValue] = useState('۲۰.۰۰۰') // Display value
  const [value2, setValue2] = useState(20000)
  const [Tab, setTab] = useState(1) // Tab state
  const [accountCharge, setAccountCharge] = useState('')
  //============================Constants==========================
  const { PAYMENT_SCREEN } = CONSTANTS.Routes
  const accToken = useSelector(state => state.accToken.accToken)
  const userData = useSelector(state => state.userData.userData)
  //============================Functions==========================

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  useEffect(() => {
    const charge = userData?.smsbalance * userData?.smsprice
    setAccountCharge(charge)
  }, [userData])

  const handleTextChange = input => {
    const englishInput = convertPersianToEnglishNumber(input)
    const numericValue = englishInput.replace(/[^\d]/g, '')
    const formattedNumber = formatNumber(numericValue)
    const persianFormattedValue = convertEnglishToPersianNumber(formattedNumber)
    setValue(persianFormattedValue)
    setValue2(numericValue)
  }
  const payment = () => {
    const url = `https://acc.confidentech.net/api/payment/${value2}?token=${accToken}`
    console.log('payment url: ', url)
    navigation.navigate(PAYMENT_SCREEN, { url })
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      />
      <Header2 {...{ navigation, toggleDrawer }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <View style={styles.inventoryContainer}>
          <View style={styles.inventory}>
            <Text style={styles.title}>
              {convertEnglishToPersianNumber(
                isNaN(accountCharge) || accountCharge == null
                  ? 100000
                  : accountCharge
              )}{' '}
              ریال
            </Text>
            <Text style={styles.title}>موجودی</Text>
          </View>
        </View>
        <View style={styles.chargeContainer}>
          <Text style={styles.chargeTitle}>شارژ پیامک</Text>
          <ButtonTab4
            {...{
              title1: '۲۰.۰۰۰',
              title2: '۵۰.۰۰۰',
              title3: '۱۰۰.۰۰۰',
              title4: '۲۰۰.۰۰۰'
            }}
            onTabbarPress={setTab}
            setValue={setValue}
            setValue2={setValue2}
          />
          <Text style={styles.inventoryTitle}>
            شارژ به مبلغ دلخواه (حداقل ۲۰.۰۰۰ ریال)
          </Text>
          <View style={styles.rowPrice}>
            <Text style={styles.amountTitle}>ریال</Text>
            <Input2
              Container={styles.textContainer}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              name='inpute'
              keyboardType={'numeric'}
              placeholder={''}
              handleValue={handleTextChange}
              value={value}
              error={false}
              errorText={''}
              isLast={false}
              showTextError={false}
            />
            <Text style={styles.amountTitle}>مبلغ</Text>
          </View>
          <View style={styles.btnContainer}>
            <FormBtn
              handleSubmit={payment}
              disabled={value2 >= 20000 ? true : false}
              title={'پرداخت'}
              loading={false}
              style={{ width: 91 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SMSRechargeScreen
