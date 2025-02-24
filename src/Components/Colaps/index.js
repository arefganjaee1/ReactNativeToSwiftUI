import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../Theme/Images'
import styles from './styles'

const Collaps1 = ({ title, content, contentHeight, isOpen, toggleSection }) => {
  const { ArrowDown, ArrowUp } = Images
  const [isCollapsed, setIsCollapsed] = useState(true)
  const translateY = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const toggleCollapse = () => {
    toggleSection()
  }
  useEffect(() => {
    setIsCollapsed(!isOpen)
    Animated.timing(translateY, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start(() => {})
  }, [isOpen])

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [53, contentHeight]
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
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {typeof content === 'function' ? content() : content}
    </Animated.View>
  )
}

export default Collaps1
