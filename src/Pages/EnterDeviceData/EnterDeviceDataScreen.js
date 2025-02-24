import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native'
import { useSelector } from 'react-redux'
import { useDevicesApi } from '../../Api/useDevicesApi'
import AddDeviceForm2 from '../../Components/AddDeviceForm2'
import Colaps3 from '../../Components/Colaps3'
import Header from '../../Components/Header/Header'
import MovingDevices2 from '../../Components/MovingDevices2'
import SuccessModal from '../../Components/SuccessModal/SuccessModal'
import Images from '../../Theme/Images'
import AcceptDeviceModal from './AcceptDeviceModal/AcceptDeviceModal'
import styles from './EnterDeviceDataStyles'

const EnterDeviceDataScreen = ({ navigation }) => {
  //============================STATE==========================
  const [movingDevices, setMovingDevices] = useState([])
  const [getDeviceVisible, setGetDeviceVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  //============================Constants==========================
  const { Logo } = Images
  const { handleGetDevices } = useDevicesApi()
  const accToken = useSelector(state => state.accToken.accToken)
  //============================Functions==========================
  const toggleSection = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section))
  }
  useEffect(() => {
    getMovingDevicesList()
  }, [])
  const getMovingDevicesList = async () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/movingdeviceslist', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setMovingDevices(result?.data)
      })
      .catch(error => console.error(error))
  }
  const transferList = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transferOfOwnership}
      >
        <MovingDevices2
          {...{
            setSuccessVisible,
            setGetDeviceVisible,
            getMovingDevicesList,
            handleGetDevices,
            movingDevices
          }}
        />
      </ScrollView>
    )
  }

  const enterDeviceData = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AddDeviceForm2 {...{ navigation }} />
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <AcceptDeviceModal
        isVisible={getDeviceVisible}
        setVisible={setGetDeviceVisible}
      />
      <SuccessModal isVisible={successVisible} setVisible={setSuccessVisible} />
      <Header {...{ navigation }} />
      <Logo style={styles.logoImg} />
      <Text style={styles.title}>ورود اطلاعات دستگاه</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <KeyboardAvoidingView style={{ width: '100%' }} behavior={'padding'}>
          {movingDevices?.length > 0 && (
            <>
              <Colaps3
                {...{
                  title: 'دریافت انتقال مالکیت',
                  contentHeight: 200
                }}
                content={transferList}
                isOpen={openSection === 1}
                toggleSection={() => toggleSection(1)}
                key={1}
              />
              <Colaps3
                {...{
                  title: 'ورود اطلاعات دستگاه',
                  contentHeight: 300
                }}
                content={enterDeviceData}
                isOpen={openSection === 2}
                toggleSection={() => toggleSection(2)}
                key={2}
              />
            </>
          )}
          {movingDevices?.length == 0 && (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <AddDeviceForm2 {...{ navigation }} />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default EnterDeviceDataScreen
