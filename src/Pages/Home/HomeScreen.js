import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useDevicesApi } from '../../Api/useDevicesApi'
import { usePositionApi } from '../../Api/usePositionApi'
import ButtomSheetDevices from '../../Components/ButtomSheetDevices'
import ButtonTab3 from '../../Components/ButtonTab3/ButtonTab3'
import ButtonTab6 from '../../Components/ButtonTab6/ButtonTab6'
import DrawerMenu from '../../Components/DrawerMenu'
import { setUserInfo } from '../../Stores/actions/UserDataAction'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import Dashboard from './Components/Dashboard/Dashboard'
import Direction from './Components/Direction/Direction'
import Map from './Components/Map/Map'
import styles from './HomeStyles'
import SurveyModal from './SurveyModal/SurveyModal'
const HomeScreen = ({ navigation, route }) => {
  //============================STATE==========================
  const [buttomTab, setButtomTab] = useState(4)
  const [socketData, setSocketData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [surveyVisible, setSurveyVisible] = useState(false)
  //============================Constants==========================
  const fcmToken = useSelector(state => state.fcmToken.fcmToken)
  const userData = useSelector(state => state.userData.userData)
  const accToken = useSelector(state => state.accToken.accToken)
  const cookie = useSelector(state => state.cookie.cookie)
  const { Drawer } = Images
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => [110, 300], [])
  const { handleGetDevices, devicesData } = useDevicesApi()
  const { handleGetPosition, positionData } = usePositionApi()
  const reviewid = route.params?.reviewid
  const dispatch = useDispatch()
  //============================Functions==========================
  useEffect(() => {
    if (reviewid > 0) {
      setSurveyVisible(true)
    }
  }, [reviewid])
  useEffect(() => {
    if (!userData.subscriptionplans) {
      splashServerRequest()
    }
  }, [])
  const splashServerRequest = () => {
    const myHeaders = new Headers()
    myHeaders.append('acctoken', accToken)
    const formdata = new FormData()
    formdata.append('app_version', '1')
    formdata.append('os', 'android')
    formdata.append('fcmtoken', fcmToken)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch('https://acc.confidentech.net/api/splash', requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(setUserInfo(result))
      })
      .catch(error => console.error(error))
  }
  useEffect(() => {
    handleGetDevices()
    handleGetPosition()
  }, [buttomTab])

  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.dark)
    StatusBar.setTranslucent(true)
    StatusBar.setBarStyle('light-content')
  }, [])

  const handleSheetChanges = useCallback(index => {}, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  useEffect(() => {
    const ws = new WebSocket('wss://web.confidentech.net/api/socket', [], {
      headers: {
        Cookie: `JSESSIONID=${cookie}`
      }
    })

    ws.onopen = () => {
      ws.send('something')
    }
    const isEmptyObject = obj => {
      return Object.keys(obj).length === 0
    }
    ws.onmessage = e => {
      const newData = e.data
      if (newData === {}) {
        console.log('Data is equal to {}')
      } else if (isEmptyObject(newData)) {
        console.log('Data is an empty object')
      } else if (JSON.stringify(newData) === '{}') {
        console.log('newData is an empty object')
      } else if (newData === '{}') {
        console.log('newData is an empty object')
      } else {
        const positions = JSON.parse(newData)
        setSocketData(positions)
      }
    }

    ws.onerror = e => {
      console.log('error', e.message)
    }

    ws.onclose = e => {
      console.log(e.code, e.reason)
    }
    return () => {
      ws.close()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <SurveyModal
        isVisible={surveyVisible}
        setVisible={setSurveyVisible}
        reviewid={reviewid}
      />
      {buttomTab == 1 && <Direction />}
      {buttomTab == 3 && <Map {...{ socketData }} />}
      {buttomTab == 4 && (
        <Dashboard {...{ navigation, socketData, devicesData, positionData }} />
      )}

      <TouchableOpacity onPress={toggleDrawer} style={styles.menue}>
        {(buttomTab == 1 || buttomTab == 3) && <Drawer />}
      </TouchableOpacity>

      {buttomTab == 3 && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
          handleStyle={{ backgroundColor: '#000' }}
          backgroundStyle={{ backgroundColor: '#000' }}
          panGestureHandlerEnabled={false}
          handleStyle={{
            backgroundColor: '#000',
            borderTopRightRadius: 19,
            borderTopLeftRadius: 19
          }}
        >
          <View style={styles.topButton}>
            <Text style={styles.title}>دستگاه</Text>
          </View>
          <BottomSheetScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
              zIndex: 1000,
              paddingBottom: 90
            }}
          >
            <ButtomSheetDevices
              {...{ navigation, devicesData, positionData, socketData }}
            />
          </BottomSheetScrollView>
        </BottomSheet>
      )}
      {buttomTab == 3 && (
        <ButtonTab3
          {...{
            title1: 'من تا متحرک',
            title2: 'گزارشات',
            title3: 'نقشه',
            title4: 'داشبورد',
            navigation,
            buttomTab
          }}
          onButtomTabbarPress={setButtomTab}
        />
      )}
      {(buttomTab == 1 || buttomTab == 4) && (
        <ButtonTab6
          {...{
            title1: 'من تا متحرک',
            title2: 'گزارشات',
            title3: 'نقشه',
            title4: 'داشبورد',
            navigation,
            buttomTab
          }}
          onButtomTabbarPress={setButtomTab}
        />
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
