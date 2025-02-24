import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'
import { Input } from 'react-native-elements'
import Images from '../../Theme/Images'
import styles from './styles'

const TextInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  top = 0,
  style,
  error,
  errorText,
  isLast,
  showTextError,
  inputContainerStyle,
  containerStyle,
  Container,
  inputStyle,
  handleValue,
  onBlur,
  ...rest
}) => {
  const { TikIcon } = Images
  const [animValue] = useState(new Animated.Value(0))
  const [animHeight] = useState(new Animated.Value(0))
  const [showError, setShowError] = useState(false) // Add showError state
  const inputRef = useRef(null)

  const startShake = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animValue, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start()
  }

  const animateShowError = () => {
    Animated.timing(animHeight, {
      toValue: 20,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }

  const animateHideError = () => {
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    if (showError) {
      animateShowError()
      startShake()
    } else {
      animateHideError()
    }
  }, [showError])

  const handleBlur = e => {
    onBlur && onBlur(e)
    setShowError(!!error) // Set showError based on error existence
  }

  return (
    <Animated.View
      style={[
        { top: top, ...style },
        { transform: [{ translateX: animValue }] }
      ]}
    >
      <View
        style={[
          styles.Container,
          containerStyle,
          showError && { borderColor: 'red' }
        ]}
      >
        <Input
          inputContainerStyle={[
            styles.inputContainerStyle,
            inputContainerStyle
          ]}
          ref={inputRef}
          inputStyle={[styles.input, inputStyle]}
          {...rest}
          placeholderTextColor='#707070'
          name={name}
          value={value}
          placeholder={placeholder}
          style={[styles.input, style]}
          containerStyle={[styles.containerStyle, containerStyle]}
          keyboardType={keyboardType || 'default'}
          onChangeText={text => {
            setShowError(false) // Reset error when user types
            handleValue(text)
          }}
          onBlur={handleBlur} // Handle blur event
          maxLength={2}
        />
      </View>

      {showTextError && showError && (
        <Animated.Text style={[styles.errorText, { height: animHeight }]}>
          {errorText}
        </Animated.Text>
      )}
    </Animated.View>
  )
}

export default memo(TextInput)
