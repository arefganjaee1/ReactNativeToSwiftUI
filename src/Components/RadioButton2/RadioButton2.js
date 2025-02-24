import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Images from '../../Theme/Images';

const RadioButton2 = ({ style, onTabbarPress, title1, title2, title3 }) => {
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
          style={[styles.radioButton]}
        >
          {item === 1 && <Cheked />}
          {item !== 1 && <Check />}
          <Text style={[styles.title]}>{title1}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTabbar(2)}
          style={[styles.radioButton]}
        >
          {item === 2 && <Cheked />}
          {item !== 2 && <Check />}
          <Text style={[styles.title]}>{title2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTabbar(3)}
          style={[styles.radioButton]}
        >
          {item === 3 && <Cheked />}
          {item !== 3 && <Check />}
          <Text style={[styles.title]}>{title3}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RadioButton2;
