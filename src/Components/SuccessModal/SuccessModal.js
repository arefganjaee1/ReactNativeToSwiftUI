import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { Images } from '../../Theme';
import styles from './styles';

const SuccessModal = ({ isVisible, setVisible }) => {
  const { Close, Successful } = Images;
  const handleBack = () => {
    setVisible(false);
  };

  return (
    <View>
      <Modal
        hasBackdrop={true}
        isVisible={isVisible}
        avoidKeyboard
        swipeDirection={['up', 'left', 'right', 'down']}
        testID={'modal'}
        style={styles.view}
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
            <Image
              resizeMode="cover"
              style={{ width: '50%', height: 152 }}
              source={Successful}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.title}>عملیات موفق</Text>
            <Text style={styles.subTitle}>
              درخواست انتقال شما با موفقیت ثبت شد دستگاه شما بعد از تایید توسط
              گیرنده از لیست دستگاه های شما حذف می شود
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SuccessModal;
