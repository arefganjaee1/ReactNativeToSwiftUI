import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, Text, View } from 'react-native'
import { Easing } from 'react-native-reanimated'
import Images from '../../Theme/Images'
import { convertEnglishToPersianNumber } from './../../Helpers/numberConverter2'
import styles from './style'

const GrowingView = ({
  summaryData,
  summaryLoading,
  summaryError,
  startDate,
  animation
}) => {
  //============================STATE==========================
  const [averageSpeed, setAverageSpeed] = useState()
  const [spentFuel, setSpentFuel] = useState()
  //============================Constants==========================
  const { Automobile, HoverStat } = Images
  const positionX = useRef(new Animated.Value(0)).current
  const widthValue = useRef(new Animated.Value(0)).current
  const animatedStyle = {
    transform: [{ translateX: positionX }]
  }
  const animatedStyle2 = {
    width: widthValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    })
  }
  //============================Functions==========================
  useEffect(() => {
    if (animation) {
      startAnimation()
    }
  }, [summaryData])

  const startAnimation = () => {
    Animated.timing(widthValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false
    }).start()
    Animated.timing(positionX, {
      toValue: -100,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (summaryData && summaryData[0]) {
      const speed = summaryData[0]?.averageSpeed
      const fuel = summaryData[0]?.spentFuel
      const averageSpeed =
        typeof speed === 'number' && !isNaN(speed)
          ? (speed * 1.852)?.toFixed(0)
          : '0'
      const spentFuel =
        typeof fuel === 'number' && !isNaN(fuel)
          ? Math.abs(fuel?.toFixed(0))
          : '0'
      const averageSpeedPersian = convertEnglishToPersianNumber(averageSpeed)
      const spentFuelPersian = convertEnglishToPersianNumber(spentFuel)
      setAverageSpeed(averageSpeedPersian)
      setSpentFuel(spentFuelPersian)
    }
  }, [summaryData])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.main}
    >
      <View style={styles.container}>
        <View style={styles.title}></View>
        <View style={styles.stickyContainer}>
          <Animated.View style={[styles.growingView, animatedStyle2]} />
          <Animated.View style={[styles.movingView, animatedStyle]}>
            <View style={styles.top}>
              <Text style={styles.text}>
                سرعت متوسط {averageSpeed ? averageSpeed : '0'} کیلومتر برساعت
              </Text>
              {/* <Text style={styles.text2}>
                {spentFuel ? spentFuel : '0'} لیتر{' '}
              </Text> */}
              <HoverStat
                width={145}
                height={100}
                preserveAspectRatio='xMidYMid slice'
                viewBox='0 0 107 90'
              />
            </View>
            <View style={styles.bottom}>
              <View
                style={{
                  height: 13,
                  width: 30,
                  marginTop: 3.3,
                  backgroundColor: '#F04E29',
                  overflow: 'hidden'
                }}
              ></View>
              <Automobile />
            </View>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  )
}

export default GrowingView
