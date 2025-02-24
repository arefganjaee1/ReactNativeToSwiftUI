import React, { useState } from 'react';
import { Text, TouchableOpacity,View,Linking } from 'react-native';
import styles from './styles';
import Images from '../../Theme/Images';

const CallToUs = () => {
    //============================STATE==========================
    const [callButtonStatus, setCallButtonStatus] = useState(false);
    //============================Constants==========================
    const { CallToUsIcon  } = Images;
    //============================Functions==========================
    const handleCall = () => {
      setCallButtonStatus(!callButtonStatus);
    };
  
    const handleCallNumber = () => {
      const phoneNumberWithProtocol = `tel:${'02188862901'}`;
      Linking.openURL(phoneNumberWithProtocol);
    };
  return (
    <View style={styles.botton}>
    {callButtonStatus == false && (
      <TouchableOpacity style={styles.call} onPress={handleCall}>
        <CallToUsIcon />
      </TouchableOpacity>
    )}
    {callButtonStatus == true && (
      <View style={styles.showCall}>
        <TouchableOpacity onPress={handleCallNumber}>
          <Text style={styles.number}>۰۲۱-۸۸۸۶۲۹۰۱</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.call} onPress={handleCall}>
          <CallToUsIcon />
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
};

export default CallToUs;
