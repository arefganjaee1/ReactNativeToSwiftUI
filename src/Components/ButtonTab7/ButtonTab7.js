import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../Theme'
import styles from './styles'

const ButtonTab7 = ({ onTabbarPress, title1, title2, wayToInstall }) => {
  const [item, setItem] = useState(wayToInstall)
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
        <Text style={styles.itemText}>{title1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabbar(2)}
        style={[styles.itemBtn, item === 2 && { backgroundColor: Colors.gray }]}
      >
        <Text style={[styles.itemText, { paddingRight: 13 }]}>{title2}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ButtonTab7
