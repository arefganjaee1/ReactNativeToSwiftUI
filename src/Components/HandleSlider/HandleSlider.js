import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Images from '../../Theme/Images';
import { Colors } from '../../Theme';
import CONSTANTS from '../../Values/Constants';
import Spacer from '../Spacer/Spacer';
import Slider from '@react-native-community/slider';

const HandleSlider = ({
  Criterion,
  toFixed,
  setSliderValue,
  sliderValue,
  minimumValue,
  maximumValue,
  step,
}) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={{
          width: '98%',
          height: '100%',
        }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={Colors.orange}
        maximumTrackTintColor={Colors.lightOrange}
        thumbTintColor={Colors.orange}
        value={sliderValue}
        onValueChange={setSliderValue}
        step={step}
      />
      <View style={styles.sliderText}>
        <Text style={styles.sliderValueText}>
          {sliderValue && +sliderValue.toFixed(toFixed)}
          {Criterion}
        </Text>
      </View>
    </View>
  );
};

export default HandleSlider;
