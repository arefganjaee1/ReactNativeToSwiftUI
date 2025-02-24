import React, { useEffect, useState } from 'react'
import { Linking, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import Header2 from '../../Components/Header2/Header2'
import Images from '../../Theme/Images'
import styles from './ContactSupportStyles'

const ContactSupportScreen = ({ navigation }) => {
  //============================STATE==========================
  const [WhatsAppLink, setWhatsAppLink] = useState(
    'https://wa.me/message/QTPKKFI7HGM6B1'
  )
  const [EitaaLink, setEitaaLink] = useState('https://eitaa.com/confidentech')
  const [TelegramLink, setTelegramLink] = useState('https://t.me/confidentech')
  const [WebsiteLink, setWebsiteLink] = useState('https://confidentech.net/')
  const [CallNumber, setCallNumber] = useState('02188862901')
  //============================Constants==========================
  const { Whatsapp, Etta, Telegram, Website, CallToUsIcon } = Images
  const accToken = useSelector(state => state.accToken.accToken)
  //============================Functions==========================
  const openWhatsApp = () => {
    const url = WhatsAppLink
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  const openEitaaApp = () => {
    const url = EitaaLink
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  const openTelegramApp = () => {
    const url = TelegramLink
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  const openWebsite = () => {
    const url = WebsiteLink
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }
  const CallToSupport = () => {
    const phoneNumberWithProtocol = `tel:${CallNumber}`
    Linking.openURL(phoneNumberWithProtocol)
  }
  useEffect(() => {
    serverRequest()
  }, [])
  const serverRequest = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch('https://acc.confidentech.net/api/contactusdata', requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result?.status === 'ok') {
          setWhatsAppLink(result?.whatsapp)
          setTelegramLink(result?.telegram)
          setWebsiteLink(result?.website)
          setEitaaLink(result?.eitaa)
          setCallNumber(result?.supportnumber)
        }
      })
      .catch(error => console.error('Error:', error))
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header2 {...{ navigation }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={openEitaaApp} style={styles.button}>
            <View style={styles.buttonTopSection}>
              <Etta />
              <Text style={styles.btnText}>ایتا</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openWhatsApp} style={styles.button}>
            <View style={styles.buttonTopSection}>
              <Whatsapp />
              <Text style={styles.btnText}>واتساپ</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={openWebsite} style={styles.button}>
            <View style={styles.buttonTopSection}>
              <Website />
              <Text style={styles.btnText}>وبسایت</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openTelegramApp} style={styles.button}>
            <View style={styles.buttonTopSection}>
              <Telegram />
              <Text style={styles.btnText}>تلگرام</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={CallToSupport} style={styles.callToUsButton}>
          <View
            style={[
              styles.buttonTopSection,
              { height: '50%', flexDirection: 'row' }
            ]}
          >
            <Text style={[styles.btnText, { paddingRight: 10 }]}>پشتیبانی</Text>
            <CallToUsIcon style={{ marginTop: 10 }} />
          </View>
          <View style={styles.buttonBottomSection}>
            <Text style={[styles.btnText, { marginBottom: 15 }]}>
              ۰۲۱-۸۸۸۶۲۹۰۱
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
export default ContactSupportScreen
