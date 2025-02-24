import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Text, Easing, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';
import { useProductSearchApi } from '../../Hooks/Api/useProductSearchApi';
import { useSelector } from 'react-redux';

const InputWithText = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  top = 0,
  style,
  errorText,
  isLast,
  showTextError,
  textInputStyle,
  title,
  Container,
  containerStyle,
  inputContainerStyle,
  handlePress,
  handleValue,
  value,
  error,
  ...rest
}) => {
  //============================Constants==========================
  const inputRef = useRef(null);
  const [animValue] = useState(new Animated.Value(0));
  const [animHeight] = useState(new Animated.Value(0));

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
              width: '10%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.text}>+۹۸</Text>
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

export default memo(InputWithText);
