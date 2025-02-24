import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
const Error = ({ style, FetchData }) => {
  const fetchData = () => {
    FetchData();
  };
  return (
    <View style={[styles.container, { ...style }]}>
      <Text style={styles.text}>مشکلی پیش آمده !!!</Text>
      <TouchableOpacity onPress={fetchData} style={styles.button}>
        <Text style={styles.retrytText}>تلاش مجدد</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;
