import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Images from '../../Theme/Images';

const RadioButton = ({
  style,
  onTabbarPress,
  title1,
  title2,
  walletStatus,
}) => {
  const [item, setItem] = useState(1);
  const { Check, Cheked } = Images;
  const setTabbar = (item) => {
    onTabbarPress(item);
    setItem(item);
  };

  return (
    <View style={[style, styles.container]}>
      <View style={styles.toggle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTabbar(1)}
          style={[styles.first]}
        >
          <Text style={[styles.title]}>{title1}</Text>
          {item === 1 && <Cheked />}
          {item !== 1 && <Check />}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTabbar(2)}
          style={[styles.second]}
        >
          <Text style={[styles.title]}>{title2}</Text>
          {item === 2 && <Cheked />}
          {item !== 2 && <Check />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RadioButton;
