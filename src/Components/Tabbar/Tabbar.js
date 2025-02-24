import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Colors } from '../../Theme';

const Tabbar = ({
  style,
  onTabbarPress,
  title1,
  title2,
  title3,
  walletStatus,
  performanceStatus,
}) => {
  const [item, setItem] = useState(1);
  useEffect(() => {
    console.log('walletStatus >>>>', walletStatus);
  }, [walletStatus]);

  const setTabbar = (item) => {
    onTabbarPress(item);
    setItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggle}>
        <TouchableOpacity
          onPress={() => setTabbar(1)}
          style={[
            styles.itemBtn,
            item === 1 && { backgroundColor: Colors.orange },
          ]}
        >
          <Text style={[styles.title]}>{title1}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTabbar(2)}
          style={[
            styles.itemBtn,
            item === 2 && { backgroundColor: Colors.orange },
          ]}
        >
          <Text style={[styles.title]}>{title2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Tabbar;
