import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../Theme/Images'
import styles from './styles'

const Collaps3 = ({ title, content, contentHeight, isOpen, toggleSection }) => {
  const { Check2, Checked2 } = Images
  const [isCollapsed, setIsCollapsed] = useState(true)
  const translateY = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  // Toggle the collapse state
  const toggleCollapse = () => {
    toggleSection()
  }

  // Animate the section when isOpen changes
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
            outputRange: [53, contentHeight] // Adjust outputRange for collapsed/expanded heights
          })
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerContent}
        onPress={toggleCollapse}
      >
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{title}</Text>
          {isCollapsed ? <Check2 /> : <Checked2 />}
        </View>
      </TouchableOpacity>

      {/* Render the collapsible content */}
      <View style={styles.more}>
        {typeof content === 'function' ? content() : content}
        {/* If content is a function, invoke it */}
      </View>
    </Animated.View>
  )
}

export default Collaps3
