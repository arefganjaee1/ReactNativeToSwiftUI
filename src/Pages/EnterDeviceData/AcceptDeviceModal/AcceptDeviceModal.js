import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../../Theme';
import styles from './styles';
import { Images } from '../../../Theme';
import FormBtn from '../../../Components/FormBtn/FormBtn';

const DevicesModal = ({ isVisible, setVisible }) => {
  //============================Constants==========================
  const { Close, Successful } = Images;
  //============================Functions==========================
  const handleSubmit = (e) => {};
  const handleBack = () => {
    setVisible(false);
  };

  return (
    <View>
      <Modal
        hasBackdrop={true}
        isVisible={isVisible}
        avoidKeyboard
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropColor={Colors.modalBackground}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.subTitle}>
              اینجانب تمام مسئولیت های قانونی مربوط به ردیابی متحرک انتقال یافته
              به حساب کاربری خود را با شماره سریال ۳۸۴۷۳۸۳۹ می پذیرم.{' '}
            </Text>
          </View>
          <View style={styles.bottom}>
            <FormBtn
              title={'قوانین را می پذیرم'}
              disabled={true}
              error={false}
              loading={false}
              handleSubmit={handleSubmit}
              style={styles.submitBtn}
              titleStyle={{ fontSize: 10, alignSelf: 'center' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default DevicesModal;
