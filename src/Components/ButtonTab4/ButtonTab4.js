import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './style'

const ButtonTab4 = ({
  style,
  onTabbarPress,
  title1,
  title2,
  title3,
  title4,
  setValue,
  setValue2
}) => {
  const { TRACKING_SCREEN, REPORTS_SCREEN } = CONSTANTS.Routes
  const { Tracking, Map, Reports1, Distance } = Images

  const [item, setItem] = useState(1)
  const setTabbar = (item, value, value2) => {
    onTabbarPress(item)
    setItem(item)
    setValue(value)
    setValue2(value2)
  }

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.rowBtn}>
        <TouchableOpacity
          onPress={() => setTabbar(1, title1, 20000)}
          style={[
            styles.itemBtn,
            item === 1 && { backgroundColor: Colors.grayText2 }
          ]}
        >
          <Text style={styles.price}>{title1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabbar(2, title2, 50000)}
          style={[
            styles.itemBtn,
            item === 2 && { backgroundColor: Colors.grayText2 }
          ]}
        >
          <Text style={styles.price}>{title2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowBtn}>
        <TouchableOpacity
          onPress={() => setTabbar(3, title3, 100000)}
          style={[
            styles.itemBtn,
            item === 3 && { backgroundColor: Colors.grayText2 }
          ]}
        >
          <Text style={styles.price}>{title3}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabbar(4, title4, 200000)}
          style={[
            styles.itemBtn,
            item === 4 && { backgroundColor: Colors.grayText2 }
          ]}
        >
          <Text style={styles.price}>{title4}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ButtonTab4
