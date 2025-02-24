import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';

const LicensePlate = ({ style, onTabbarPress, title1, title2 }) => {
  const [item, setItem] = useState(1);
  const { IranFlag } = Images;

  const setTabbar = (item) => {
    onTabbarPress(item);
    setItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.plateContainer}>
        <View style={styles.left}>
          <View style={styles.top}>
            <IranFlag />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text}>I.R</Text>
            <Text style={styles.text}>IRAN</Text>
          </View>
        </View>
        <View style={styles.center}>
          {/* <View style={styles.top}></View> */}
          <View style={styles.centerBottom}>
            <View style={[styles.input, { width: 35 }]}></View>
            <View style={[styles.input, { width: 25 }]}></View>
            <View style={[styles.input, { width: 50 }]}></View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text style={[styles.text, { color: Colors.dark }]}>ایران</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.input}></View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default LicensePlate;
