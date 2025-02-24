import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FormBtn from '../../Components/FormBtn/FormBtn'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import styles from './style'

const ButtonTab2 = ({
  style,
  onTabbarPress,
  title1,
  title2,
  title3,
  onReportPress
}) => {
  const { Trips, DistanceTraveled, Stop, Speed } = Images
  const {} = CONSTANTS.Routes

  const [item, setItem] = useState(3)
  const setTabbar = item => {
    onTabbarPress(item)
    setItem(item)
  }
  const handleSubmit = e => {
    onReportPress()
  }

  return (
    <View>
      <View style={styles.Container}>
        <FormBtn
          disabled={true}
          title={'دریافت گزارش'}
          handleSubmit={handleSubmit}
          style={styles.submit}
          titleStyle={styles.submitText}
        />
        <TouchableOpacity
          onPress={() => setTabbar(1)}
          style={[styles.itemBtn, item === 1 && { backgroundColor: '#464646' }]}
        >
          <View style={styles.iconCover}>
            <DistanceTraveled />
          </View>
          <View style={styles.textCover}>
            <Text style={styles.btnText}>{title1}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTabbar(2)}
          style={[styles.itemBtn, item === 2 && { backgroundColor: '#464646' }]}
        >
          <View style={styles.iconCover}>
            <Stop />
          </View>
          <View style={styles.textCover}>
            <Text style={styles.btnText}>{title2}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabbar(3)}
          style={[styles.itemBtn, item === 3 && { backgroundColor: '#464646' }]}
        >
          <View style={styles.iconCover}>
            <Trips />
          </View>
          <View style={styles.textCover}>
            <Text style={styles.btnText}>{title3}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ButtonTab2
