import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import { useDevicesApi } from '../../Api/useDevicesApi'
import DevicesList from '../../Components/DevicesList'
import DrawerMenu from '../../Components/DrawerMenu'
import Error from '../../Components/Error/Error'
import Header2 from '../../Components/Header2/Header2'
import Loading from '../../Components/Loading/Loading'
import MovingDevices from '../../Components/MovingDevices'
import Spacer from '../../Components/Spacer/Spacer'
import SuccessModal from '../../Components/SuccessModal/SuccessModal'
import { useCheckNetInfo } from '../../Hooks/useCheckNetInfo'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import AcceptDeviceModal from './AcceptDeviceModal/AcceptDeviceModal'
import styles from './DevicesStyles'
import TransferDeviceModal from './TransferDeviceModal/TransferDeviceModal'

const DevicesScreen = ({ navigation }) => {
  //============================STATE==========================
  const [movingDevices, setMovingDevices] = useState([])
  const [getDeviceVisible, setGetDeviceVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [trasferDeviceVisible, setTrasferDeviceVisible] = useState(false)
  const [transferDeviceId, setTransferDeviceId] = useState()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  //============================Constants==========================
  const { handleGetDevices, devicesLoading, devicesError } = useDevicesApi()
  const { netInfo } = useCheckNetInfo()
  const { Plus2 } = Images
  const { ADD_DEVICE_SCREEN } = CONSTANTS.Routes
  const devicesData = useSelector(state => state.devices.devices)
  const Devices = devicesData
  const accToken = useSelector(state => state.accToken.accToken)
  //============================Functions==========================
  useEffect(() => {
    getMovingDevicesList()
  }, [])
  //get moving devices list
  const getMovingDevicesList = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch('https://acc.confidentech.net/api/movingdeviceslist', requestOptions)
      .then(response => response.text())
      .then(result => {
        const response = JSON.parse(result)
        setMovingDevices(response?.data)
      })
      .catch(error => console.error(error))
  }
  const handleAddDevice = () => {
    navigation.navigate(ADD_DEVICE_SCREEN)
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  useEffect(() => {
    fetchData()
  }, [])
  const refreshDevices = () => {
    fetchData()
  }
  const fetchData = () => {
    handleGetDevices()
  }
  const handleContent = () => {
    if (netInfo) {
      if (devicesError === '') {
        if (devicesLoading) {
          return <Loading color={Colors.light} />
        } else {
          if (Devices) {
            return (
              <>
                <View>
                  <DevicesList
                    {...{
                      navigation,
                      Devices,
                      refreshDevices,
                      setTrasferDeviceVisible,
                      setTransferDeviceId
                    }}
                  />
                </View>
              </>
            )
          } else {
            return (
              <>
                <View>
                  <Text style={styles.text}>دیتایی برای نمایش وجود ندارد</Text>
                </View>
              </>
            )
          }
        }
      } else {
        return <Error FetchData={fetchData} />
      }
    } else {
      return <Error FetchData={fetchData} />
    }
  }

  const handleGetDevice = () => {
    setGetDeviceVisible(true)
  }
  const handleSuccess = () => {
    setSuccessVisible(true)
  }
  const refreshMovingDevice = () => {
    getMovingDevicesList()
  }
  return (
    <SafeAreaView style={styles.container}>
      <TransferDeviceModal
        isVisible={trasferDeviceVisible}
        setVisible={setTrasferDeviceVisible}
        transferDeviceId={transferDeviceId}
      />
      <AcceptDeviceModal
        isVisible={getDeviceVisible}
        setVisible={setGetDeviceVisible}
      />
      <SuccessModal isVisible={successVisible} setVisible={setSuccessVisible} />

      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />

      <View style={styles.searchRow}>
        <TouchableOpacity onPress={handleAddDevice} style={styles.plusBtn}>
          <Text style={styles.btnText}>افزودن دستگاه</Text>
          <Plus2 />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>{handleContent()}</View>
      <Spacer
        style={{
          height: 6,
          marginTop: 5,
          backgroundColor: '#2E2E2E',
          borderRadius: 3
        }}
      />
      <View style={styles.searchRow}>
        <TouchableOpacity onPress={refreshMovingDevice} style={styles.plusBtn}>
          <Text style={styles.btnText}>بروز رسانی</Text>
        </TouchableOpacity>
        <Text style={styles.transferOfOwnershipText}>دریافت انتقال مالکیت</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transferOfOwnership}
      >
        <MovingDevices
          {...{
            setSuccessVisible,
            setGetDeviceVisible,
            handleGetDevices,
            getMovingDevicesList,
            movingDevices
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
export default DevicesScreen
