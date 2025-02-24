import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles';
const Loading = ({ style, size, color }) => {
  return (
    <View style={[styles.indicator, { ...style }]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default Loading;
