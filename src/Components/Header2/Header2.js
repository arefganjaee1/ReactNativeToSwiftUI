import React, { useState } from 'react';
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
import Spacer from '../Spacer/Spacer';
import DrawerMenu from '../../Components/DrawerMenu';

const Header2 = ({ navigation, toggleDrawer }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { ArrowBack, DrawerWhite } = Images;
  const {} = CONSTANTS.Routes;

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleDrawerPress = () => {
    toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.back}>
        <ArrowBack />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleDrawerPress} style={styles.drawer}>
        <DrawerWhite />
      </TouchableOpacity> */}
      <View></View>
    </View>
  );
};

export default Header2;
