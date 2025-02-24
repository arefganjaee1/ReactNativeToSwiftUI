import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import ButtonTab5 from '../../Components/ButtonTab5/ButtonTab5'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './styles'

const SelectMovingType = ({
  title,
  RightIcon,
  contentHeight,
  setMovingType,
  movingType,
  isOpen,
  toggleSection
}) => {
  const { ArrowDown, ArrowUp } = Images
  const translateY = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }, [isOpen])

  const onTabPress = item => {
    setMovingType(item)
    toggleSection()
  }

  const handleTitle = () => {
    if (movingType) {
      if (movingType === 1) {
        return 'ماشین'
      }
      if (movingType === 2) {
        return 'موتور'
      }
    }
    return title
  }

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [60, contentHeight]
          })
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerContent}
        onPress={toggleSection}
      >
        <View style={styles.iconContainer}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.title,
              movingType ? { color: Colors.light } : { color: Colors.grayText2 }
            ]}
          >
            {handleTitle()}
          </Text>
          <RightIcon />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <ButtonTab5
          {...{
            title1: 'ماشین',
            title2: 'موتور',
            movingType
          }}
          onTabbarPress={item => onTabPress(item)}
        />
      )}
    </Animated.View>
  )
}

export default SelectMovingType
