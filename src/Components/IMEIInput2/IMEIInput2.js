import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Text, Easing, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import Images from '../../Theme/Images';

const IMEIInput2 = ({
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
  handlePress,
  ...rest
}) => {
  const { IMEI } = Images;
  const [animValue] = useState(new Animated.Value(0));
  const [animHeight] = useState(new Animated.Value(0));
  const inputRef = useRef(null);

  const startShake = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showError = () => {
    Animated.timing(animHeight, {
      toValue: 20,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const hideError = () => {
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (error && inputRef.current.isFocused()) {
      showError();
    } else if (error && value?.length && !inputRef.current.isFocused()) {
      showError();
      startShake();
    } else {
      hideError();
    }
  });

  return (
    <Animated.View
      style={[
        { top: top, ...style },
        { transform: [{ translateX: animValue }] },
      ]}
    >
      <View style={[styles.Container, Container]}>
        <View style={styles.TextContainer}>
          <View
            style={{
              height: '100%',
              width: '15%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.text}>IMEI</Text>
          </View>
          <Input
            inputContainerStyle={[
              styles.inputContainerStyle,
              inputContainerStyle,
            ]}
            ref={inputRef}
            inputStyle={[styles.input, { ...textInputStyle }]}
            {...rest}
            placeholderTextColor={Colors.light}
            name={name}
            value={value}
            placeholder={placeholder}
            style={[styles.input, { ...textInputStyle }]}
            containerStyle={[styles.containerStyle, containerStyle]}
            keyboardType={keyboardType || 'email-address'}
          />
          <View
            style={{
              height: '100%',
              width: '15%',
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
              onPress={handlePress}
            >
              <IMEI />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showTextError && value && (
        <Animated.Text
          style={{
            top: 5,
            height: animHeight,
            fontSize: 13,
            color: Colors.red,
          }}
        >
          {errorText}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default memo(IMEIInput2);
