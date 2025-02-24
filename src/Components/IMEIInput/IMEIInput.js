import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Easing, TouchableOpacity, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './styles'

const IMEIInput = ({
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
  rightIcon,
  secureText,
  Container,
  containerStyle,
  inputContainerStyle,
  textInputStyle,
  onChangeText,
  handlePress,
  ...rest
}) => {
  const { IMEI } = Images
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
    <Animated.View
      style={[
        { top: top, marginTop: 15, ...style },
        { transform: [{ translateX: animValue }] }
      ]}
    >
      <View style={[styles.Container, Container]}>
        <View style={styles.TextContainer}>
          {/* <View
            style={{
              height: '100%',
              width: '15%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.text}>IMEI</Text>
          </View> */}
          <Input
            inputContainerStyle={[
              styles.inputContainerStyle,
              inputContainerStyle
            ]}
            ref={inputRef}
            inputStyle={[styles.input, { ...textInputStyle }]}
            {...rest}
            placeholderTextColor={Colors.grayText2}
            name={name}
            value={value}
            placeholder={placeholder}
            style={[styles.input, { ...textInputStyle }]}
            containerStyle={[styles.containerStyle, containerStyle]}
            keyboardType={keyboardType || 'default'}
            onChangeText={text => {
              onChangeText(text)
            }}
          />
          <View
            style={{
              height: '100%',
              width: '12%',
              minWidth: 30
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}
              onPress={handlePress}
            >
              <IMEI style={{ height: 20, with: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showTextError && value && (
        <Animated.Text style={[styles.errorText, { height: animHeight }]}>
          {errorText}
        </Animated.Text>
      )}
    </Animated.View>
  )
}

export default memo(IMEIInput)
