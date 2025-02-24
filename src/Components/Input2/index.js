import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Text, Easing, View } from 'react-native'
import { Input } from 'react-native-elements'
import styles from './styles'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'

const Input2 = ({
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
  ...rest
}) => {
  const { TikIcon } = Images
  const [animValue] = useState(new Animated.Value(0))
  const [animHeight] = useState(new Animated.Value(0))
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

  const showError = () => {
    Animated.timing(animHeight, {
      toValue: 20,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }
  const hideError = () => {
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }
  useEffect(() => {
    if (error && inputRef.current.isFocused()) {
      showError()
    } else if (error && value?.length && !inputRef.current.isFocused()) {
      showError()
      startShake()
    } else {
      hideError()
    }
  })

  return (
    <View
      style={[
        styles.Container,
        Container,
        error &&
          inputRef?.current?.isFocused() &&
          value?.length && { borderColor: 'red' },
        !error && value?.length && { borderColor: '#0FA96B' },
        error && value?.length && { borderColor: 'red' }
      ]}
    >
      <Input
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        ref={inputRef}
        inputStyle={[styles.input, inputStyle]}
        {...rest}
        placeholderTextColor='#707070'
        name={name}
        value={value}
        placeholder={placeholder}
        style={[styles.input, style]}
        containerStyle={[styles.containerStyle, containerStyle]}
        keyboardType={keyboardType || 'defult'}
        onChangeText={text => handleValue(text)}
      />
    </View>
  )
}

export default memo(Input2)
