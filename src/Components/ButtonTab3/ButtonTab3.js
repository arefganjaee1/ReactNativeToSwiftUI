import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Images from '../../Theme/Images';
import CONSTANTS from '../../Values/Constants';
import { Colors } from '../../Theme';

const ButtonTab3 = ({
  onButtomTabbarPress,
  title1,
  title2,
  title3,
  title4,
  navigation,
  buttomTab,
}) => {
  const { TRACKING_SCREEN, REPORTS_SCREEN } = CONSTANTS.Routes;
  const { Tracking, Map, Reports1, Distance, Dashboard } = Images;

  const [item, setItem] = useState(buttomTab);
  const setTabbar = (item) => {
    onButtomTabbarPress(item);
    setItem(item);
  };
  const handleTrackingPress = () => {
    navigation.navigate(TRACKING_SCREEN);
  };
  const handleReportsPress = () => {
    navigation.navigate(REPORTS_SCREEN);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => setTabbar(1)}
        style={[
          styles.button,
          item === 1 && { backgroundColor: Colors.orange },
        ]}
      >
        <View style={styles.iconCover}>
          <Distance />
        </View>
        <View style={styles.textCover}>
          <Text style={styles.buttonText}>{title1}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReportsPress} style={styles.button}>
        <View style={styles.iconCover}>
          <Reports1 />
        </View>
        <View style={styles.textCover}>
          <Text style={styles.buttonText}>{title2}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTabbar(3)}
        style={[
          styles.button,
          item === 3 && { backgroundColor: Colors.orange },
        ]}
      >
        <View style={styles.iconCover}>
          <Map />
        </View>
        <View style={styles.textCover}>
          <Text style={styles.buttonText}>{title3}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabbar(4)}
        style={[
          styles.button,
          item === 4 && { backgroundColor: Colors.orange },
        ]}
      >
        <View style={styles.iconCover}>
          <Dashboard />
        </View>
        <View style={styles.textCover}>
          <Text style={styles.buttonText}>{title4}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonTab3;
