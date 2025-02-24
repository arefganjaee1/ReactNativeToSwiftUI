import React, { useRef } from 'react'
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import ButtonTab7 from '../../Components/ButtonTab7/ButtonTab7'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './styles'

const SelectWAyToInstall = ({
  title,
  RightIcon,
  contentHeight,
  setWayToInstall,
  wayToInstall,
  isOpen,
  toggleSection
}) => {
  const { ArrowDown, ArrowUp } = Images
  const translateY = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }, [isOpen])

  const onTabPress = item => {
    setWayToInstall(item)
    toggleSection()
  }

  const handleTitle = () => {
    if (wayToInstall) {
      if (wayToInstall === 1) {
        return 'نصب توسط تکنسین شرکت انجام شود'
      }
      if (wayToInstall === 2) {
        return 'نصب را خودم انجام می دهم'
      }
    } else {
      return title
    }
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
              wayToInstall
                ? { color: Colors.light }
                : { color: Colors.grayText2 }
            ]}
          >
            {handleTitle()}
          </Text>
          <RightIcon />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <ButtonTab7
          {...{
            title1: 'نصب توسط تکنسین شرکت انجام شود',
            title2: 'نصب را خودم انجام می دهم',
            wayToInstall
          }}
          onTabbarPress={item => onTabPress(item)}
        />
      )}
    </Animated.View>
  )
}

export default SelectWAyToInstall
