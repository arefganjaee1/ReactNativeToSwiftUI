import { useFormikContext } from 'formik'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Easing, TouchableOpacity, View } from 'react-native'
import { Input } from 'react-native-elements'
import { useTogglePasswordVisibility } from '../../Hooks/useTogglePasswordVisibility'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './styles'

const FormInputPass = ({
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
  isIcon,
  isShake,
  ...rest
}) => {
  const { setFieldError } = useFormikContext()
  const { EyeIcon, Lock } = Images

  const [animValue] = useState(new Animated.Value(0))
  const [animHeight] = useState(new Animated.Value(0))

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility()
  const [password, setPassword] = useState('')

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
  const inputRef = useRef(null)
  return (
    <Animated.View
      style={[
        { top: top, marginTop: 10, ...style },
        { transform: [{ translateX: animValue }] }
      ]}
    >
      <View
        style={[
          styles.Container,
          error &&
            inputRef?.current?.isFocused() && { borderBottomColor: 'red' },
          error && value?.length && { borderBottomColor: 'red' }
        ]}
      >
        <View style={{ height: '100%', width: '15%' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
            onPress={handlePasswordVisibility}
          >
            <EyeIcon
              style={{
                height: 20,
                width: 20
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.TextContainer]}>
          <Input
            inputContainerStyle={{
              marginLeft: 5,
              height: '100%',
              borderBottomWidth: 0,
              width: '100%'
            }}
            ref={inputRef}
            inputStyle={styles.input}
            {...rest}
            placeholderTextColor={Colors.grayText2}
            name={name}
            value={value}
            placeholder={placeholder}
            style={styles.input}
            containerStyle={styles.inputContainerStyle}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={passwordVisibility}
            rightIcon={
              <Lock
                style={{
                  height: 20,
                  width: 20
                }}
              />
            }
          />
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

export default memo(FormInputPass)
