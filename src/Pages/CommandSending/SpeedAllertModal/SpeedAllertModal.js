import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../../Theme';
import styles from './styles';
import { Images } from '../../../Theme';
import FormBtn from '../../../Components/FormBtn/FormBtn';
import InputWithIconAndText from '../../../Components/InputWithIconAndText';
import { Formik } from 'formik';
import Schemes from '../../../Values/Schemes';

const SpeedAllertModal = ({
  isVisible,
  setVisible,
  sliderValue,
  OverSpeed,
}) => {
  //============================STATE==========================

  //============================Constants==========================
  const { CloseOrange } = Images;
  //============================Functions==========================
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
        backdropColor={'#282828'}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBack} style={styles.closeCover}>
              <CloseOrange />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.subTitle}>
              سرعت غیر مجاز {sliderValue} کیلومتر بر ساعت ثبت شد در صورت افزایش
              سرعت از این مقدار برای شما اخطار سرعت غیر مجاز ارسال می شود.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SpeedAllertModal;
