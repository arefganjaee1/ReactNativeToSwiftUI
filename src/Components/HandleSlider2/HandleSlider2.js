import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../Theme'
import styles from './style'

const SliderWithLabels = ({ sliderValue, setSliderValue }) => {
  const labels = [90, 100, 110, 120, 130, 140]
  const [value, setValue] = useState(0)
  const handleValueChange = index => {
    setSliderValue(labels[index])
    setValue(index)
    console.log(labels[index])
  }

  const handleLabelPress = index => {
    setSliderValue(labels[index])
    setValue(index)
    console.log(labels[index])
  }

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={0}
        maximumValue={labels.length - 1}
        step={1}
        thumbTintColor={Colors.orange}
        minimumTrackTintColor={Colors.orange}
        maximumTrackTintColor={Colors.lightOrange}
        onValueChange={handleValueChange}
      />
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.label]}
            onPress={() => handleLabelPress(index)}
          >
            <Text
              style={[styles.text, sliderValue === index && styles.selectText]}
            >
              {label === 90
                ? '۹۰'
                : label === 100
                ? '۱۰۰'
                : label === 110
                ? '۱۱۰'
                : label === 120
                ? '۱۲۰'
                : label === 130
                ? '۱۳۰'
                : label === 140
                ? '۱۴۰'
                : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default SliderWithLabels
