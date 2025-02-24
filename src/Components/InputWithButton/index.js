import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Text, Easing, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';
import { useProductSearchApi } from '../../Hooks/Api/useProductSearchApi';
import { useSelector } from 'react-redux';

const InputWithButton = ({
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
  ...rest
}) => {
  //============================Constants==========================
  const inputRef = useRef(null);
  const { Search } = Images;
  return (
    <View style={[styles.Container, Container]}>
      <View style={styles.TextContainer}>
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
          onChangeText={(text) => handleValue(text)}
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
            <Search />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(InputWithButton);
