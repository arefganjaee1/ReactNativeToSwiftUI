import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './styles'

const ButtonTab5 = ({ style, onTabbarPress, title1, title2, movingType }) => {
  const [item, setItem] = useState(movingType)
  const { Car, Motor2 } = Images

  const setTabbar = item => {
    onTabbarPress(item)
    setItem(item)
  }

  return (
    <View style={styles.toggle}>
      <TouchableOpacity
        onPress={() => setTabbar(1)}
        style={[styles.itemBtn, item === 1 && { backgroundColor: Colors.gray }]}
      >
        <Car />
        <Text style={styles.itemText}>{title1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabbar(2)}
        style={[styles.itemBtn, item === 2 && { backgroundColor: Colors.gray }]}
      >
        <Motor2 />
        <Text style={[styles.itemText, { paddingRight: 13 }]}>{title2}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ButtonTab5
