import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DrawerMenu from '../../../../Components/DrawerMenu'
import SelectDeviceDashboard from '../../../../Components/SelectDeviceDashboard/SelectDeviceDashboard'
import { setPosition } from '../../../../Stores/actions/PositionAction'
import Images from '../../../../Theme/Images'
// import { convertEnglishToPersianNumber } from './../../../../Helpers/numberConverter'
import { convertEnglishToPersianNumber } from './../../../../Helpers/numberConverter2'
import Map from './Map/Map'
import styles from './style'

const Dashboard = ({ navigation, socketData, positionData }) => {
  //============================STATE==========================
  const [socketPositionsData, setSocketPositionsData] = useState(null)
  const [matchingPosition, setMatchingPosition] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  //============================Constants==========================
  const dispatch = useDispatch()
  const {
    DrawerWhite,
    Logo,
    CarOff,
    CarOn,
    MotorOff,
    MotorOn,
    SpeedRed,
    SpeedYellow,
    SpeedGreen,
    BatteryRed,
    BatteryOrange,
    BatteryYellow,
    BatteryGreen,
    EnginOff,
    EnginOn,
    SatteliteOff,
    SatteliteOn
  } = Images
  const Device = useSelector(state => state.device.device)
  //============================Functions==========================
  useEffect(() => {
    console.log('Device >>>>', Device)
    console.log('matchingPosition >>>>', matchingPosition)
  }, [Device, matchingPosition])

  useEffect(() => {
    if (
      socketData?.positions?.length > 0 &&
      socketData?.positions?.[0]?.deviceId === Device?.id
    ) {
      setSocketPositionsData(socketData?.positions)
    }
  }, [socketData])

  useEffect(() => {
    if (socketPositionsData) {
      setMatchingPosition(socketPositionsData?.[0])
    }
  }, [socketPositionsData])

  useEffect(() => {
    const fetchData = async () => {
      const updatedMatchingPosition = await positionData?.find(
        position => position.deviceId == Device?.id
      )
      setMatchingPosition(updatedMatchingPosition)
      dispatch(setPosition(updatedMatchingPosition))
    }
    fetchData()
  }, [Device, positionData])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const handleVehicle = () => {
    if (
      Device?.category == 'car' &&
      matchingPosition?.attributes?.ignition == false
    ) {
      return (
        <Image resizeMode='cover' style={{ width: '100%' }} source={CarOff} />
      )
    } else if (
      Device?.category == 'car' &&
      matchingPosition?.attributes?.ignition == true
    ) {
      return (
        <Image resizeMode='cover' style={{ width: '100%' }} source={CarOn} />
      )
    } else if (
      Device?.category == 'motorcycle' &&
      matchingPosition?.attributes?.ignition == false
    ) {
      return (
        <Image resizeMode='cover' style={{ width: '100%' }} source={MotorOff} />
      )
    } else if (
      Device?.category == 'motorcycle' &&
      matchingPosition?.attributes?.ignition == true
    ) {
      return (
        <Image resizeMode='cover' style={{ width: '100%' }} source={MotorOn} />
      )
    } else {
      return (
        <Image resizeMode='cover' style={{ width: '100%' }} source={CarOff} />
      )
    }
  }
  const handleIgnition = () => {
    if (matchingPosition?.attributes?.ignition == false) {
      return (
        <EnginOff
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 110 100'
        />
      )
    } else if (matchingPosition?.attributes?.ignition == true) {
      return (
        <EnginOn
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 110 100'
        />
      )
    } else {
      return (
        <EnginOff
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 110 100'
        />
      )
    }
  }

  const handleBatteryLevel = () => {
    if (matchingPosition?.attributes?.batteryLevel) {
      if (
        matchingPosition.attributes.batteryLevel >= 0 &&
        matchingPosition.attributes.batteryLevel < 25
      ) {
        return (
          <BatteryRed
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      } else if (
        matchingPosition.attributes.batteryLevel >= 25 &&
        matchingPosition.attributes.batteryLevel < 50
      ) {
        return (
          <BatteryOrange
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      } else if (
        matchingPosition.attributes.batteryLevel >= 50 &&
        matchingPosition.attributes.batteryLevel < 75
      ) {
        return (
          <BatteryYellow
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      } else if (
        matchingPosition.attributes.batteryLevel >= 75 &&
        matchingPosition.attributes.batteryLevel <= 100
      ) {
        return (
          <BatteryGreen
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      }
    } else {
      return (
        <BatteryRed
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 110 100'
        />
      )
    }
  }

  const handleSpeed = () => {
    if (matchingPosition?.speed) {
      if (matchingPosition?.speed >= 0 && matchingPosition?.speed < 60) {
        return (
          <SpeedGreen
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      } else if (
        matchingPosition?.speed >= 60 &&
        matchingPosition?.speed < 100
      ) {
        return (
          <SpeedYellow
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      } else if (matchingPosition?.speed >= 100) {
        return (
          <SpeedRed
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 110 100'
          />
        )
      }
    } else {
      return (
        <SpeedRed
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 110 100'
        />
      )
    }
  }
  const handleSat = () => {
    if (matchingPosition?.attributes.sat) {
      if (matchingPosition?.attributes.sat >= 4) {
        return (
          <SatteliteOn
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 107 90'
          />
        )
      } else if (matchingPosition?.attributes.sat < 4) {
        return (
          <SatteliteOff
            height={20}
            width={20}
            preserveAspectRatio='xMidYMid slice'
            viewBox='0 0 107 90'
          />
        )
      }
    } else {
      return (
        <SatteliteOff
          height={20}
          width={20}
          preserveAspectRatio='xMidYMid slice'
          viewBox='0 0 107 90'
        />
      )
    }
  }

  return (
    <View style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>

      <TouchableOpacity onPress={toggleDrawer} style={styles.menue}>
        <DrawerWhite />
      </TouchableOpacity>
      <Logo style={styles.logoImg} />
      <View style={styles.dropDown}>
        <SelectDeviceDashboard />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <View style={styles.Vehicle}>{handleVehicle()}</View>
        <View style={styles.items}>
          <View style={styles.item}>
            <View style={styles.top}>{handleIgnition()}</View>
            <View style={styles.bottom}>
              <Text style={styles.itemText}>
                موتور:{' '}
                {matchingPosition?.attributes?.ignition == false
                  ? 'خاموش'
                  : matchingPosition?.attributes?.ignition == true
                  ? 'روشن'
                  : 'خاموش'}
              </Text>
            </View>
          </View>
          <View style={[styles.item, { width: '31%' }]}>
            <View style={styles.top}>{handleBatteryLevel()}</View>
            <View style={styles.bottom}>
              <Text style={styles.itemText}>
                باتری دستگاه:{' '}
                {matchingPosition?.attributes?.batteryLevel
                  ? convertEnglishToPersianNumber(
                      matchingPosition?.attributes?.batteryLevel
                    )
                  : '۰'}
                ٪
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.top}>{handleSpeed()}</View>
            <View style={styles.bottom}>
              <Text style={styles.itemText}>
                سرعت:{' '}
                {matchingPosition?.speed
                  ? convertEnglishToPersianNumber(
                      (matchingPosition?.speed * 1.852)?.toFixed(0)
                    )
                  : '۰'}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.top}>{handleSat()}</View>
            <View style={styles.bottom}>
              <Text style={styles.itemText}>
                ماهواره ها:{' '}
                {matchingPosition?.attributes?.sat
                  ? convertEnglishToPersianNumber(
                      matchingPosition?.attributes?.sat
                    )
                  : '۰'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.map}>
          <Map {...{ socketData }} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Dashboard
