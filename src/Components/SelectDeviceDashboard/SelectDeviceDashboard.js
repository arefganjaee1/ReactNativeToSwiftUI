import React, { memo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setDevice } from '../../Stores/actions/DeviceAction'
import Images from '../../Theme/Images'
import styles from './style'

const SelectDevice = () => {
  //============================STATE==========================
  const [isCollapsed, setIsCollapsed] = useState(true)
  //============================Constants==========================
  const { ArrowDown, ArrowUp } = Images
  const { Check, Cheked } = Images
  const translateY = useRef(new Animated.Value(0)).current
  const devicesData = useSelector(state => state.devices.devices)
  const Device = useSelector(state => state.device.device)
  const dispatch = useDispatch()
  //============================Functions==========================
  const handleSelectDevice = device => {
    toggleCollapse()
    dispatch(setDevice(device))
  }

  const Devices = () => {
    return (
      <ScrollView>
        {devicesData?.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => handleSelectDevice(item)}
            style={[styles.radioButton]}
          >
            {Device === item && <Cheked />}
            {Device !== item && <Check />}
            <Text style={[styles.title]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }

  const handleTitle = () => {
    if (Device) {
      return Device.name
    } else {
      return 'دستگاه مورد نظر خود را انتخاب کنید'
    }
  }

  const toggleCollapse = () => {
    Animated.timing(translateY, {
      toValue: isCollapsed ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start(() => {
      setIsCollapsed(!isCollapsed)
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            height: translateY.interpolate({
              inputRange: [0, 1],
              outputRange: [53, 170]
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
          <Text style={styles.title2}>{handleTitle()}</Text>
        </TouchableOpacity>

        {Devices()}
      </Animated.View>
    </View>
  )
}

export default memo(SelectDevice)
