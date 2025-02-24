import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './style'

const ButtonTab = ({
  style,
  onTabbarPress,
  title1,
  title2,
  title3,
  title4
}) => {
  const {} = Images
  const {} = CONSTANTS.Routes

  const [item, setItem] = useState(null)
  const setTabbar = item => {
    onTabbarPress(item)
    setItem(item)
  }

  return (
    <View>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={() => setTabbar(1)}
          style={[
            styles.itemBtn,
            item === 1 && { backgroundColor: Colors.orange }
          ]}
        >
          <Text style={[styles.title]}>{title1}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTabbar(2)}
          style={[
            styles.itemBtn,
            item === 2 && { backgroundColor: Colors.orange }
          ]}
        >
          <Text style={[styles.title]}> {title2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ButtonTab
