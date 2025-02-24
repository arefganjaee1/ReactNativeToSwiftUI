import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Colors } from '../../Theme';
import styles from './styles';

const FormAddressInput = ({
  name,
  placeholder,
  value,
  top = 0,
  style,
  error,
  errorText,
  showTextError,
  rightIcon,
  secureText,
  onChangeText,
  onBlur,
  ...rest
}) => {
  const [animValue] = useState(new Animated.Value(0));
  const [animHeight] = useState(new Animated.Value(0));
  const [showError, setShowError] = useState(false);
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

  const animateShowError = () => {
    Animated.timing(animHeight, {
      toValue: 20,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const animateHideError = () => {
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (showError) {
      animateShowError();
      startShake();
    } else {
      animateHideError();
    }
  }, [showError]);

  const handleBlur = (e) => {
    onBlur(e);
    setShowError(!!error);
  };

  return (
    <Animated.View
      style={[
        { top: top, marginTop: 15, ...style },
        { transform: [{ translateX: animValue }] },
      ]}
    >
      <View
        style={[
          styles.Container,
          showError && { borderColor: 'red' },
        ]}
      >
        <Input
          inputContainerStyle={{
            marginLeft: -5,
            height: 100,
            borderBottomWidth: 0,
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
          keyboardType={'default'}
          rightIcon={rightIcon}
          rightIconContainerStyle={{ height: 20, width: 20 }}
          underlineColorAndroid="transparent"
          secureTextEntry={secureText}
          multiline
          onChangeText={(text) => {
            setShowError(false);
            onChangeText(text);
          }}
          onBlur={handleBlur}
        />
      </View>

      {showTextError && showError && (
        <Animated.Text
          style={[styles.errorText, { height: animHeight }]}
        >
          {errorText}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default memo(FormAddressInput);