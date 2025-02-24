import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Images from '../../Theme/Images';
import CONSTANTS from '../../Values/Constants';

const TrackingList = ({ navigation, Devices, refreshDevicesData }) => {
  //============================State==========================
  const [isFetching, setIsFetching] = useState(false);
  //============================Constant==========================
  const { Tracking2 } = Images;
  const {} = CONSTANTS.Routes;
  //============================Functions==========================
  const handleOnRefresh = () => {
    setIsFetching(true);
    refreshDevicesData();
    setTimeout(() => {
      setIsFetching(false);
    }, 400);
  };
  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={6}
        data={Devices}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 350,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.rightSection}>
              <Tracking2 />
            </View>
            <View style={styles.leftSection}>
              <View style={styles.rowText}>
                <Text style={styles.title}>تاریخ شروع:</Text>
                <Text style={styles.description}>۱۴۰۲/۰۷/۱۵</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>مسافت طی شده:</Text>
                <Text style={styles.description}>۴۰ کیلومتر</Text>
              </View>
            </View>
          </View>
        )}
        onEndReachedThreshold={0.1}
        onRefresh={handleOnRefresh}
        refreshing={isFetching}
      />
    </View>
  );
};

export default TrackingList;
