import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Images from '../../Theme/Images';
// import Logo from '../../Assets/Logo/Logo.svg';
import { Colors } from '../../Theme';
import CONSTANTS from '../../Values/Constants';
import Spacer from './../Spacer/Spacer';

const SignInHeader = ({ navigation }) => {
  const { ArrowBack } = Images;
  const {} = CONSTANTS.Routes;

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.back}>
        <ArrowBack />
      </TouchableOpacity>
    </View>
  );
};

export default SignInHeader;
