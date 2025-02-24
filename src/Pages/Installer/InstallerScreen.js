import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import styles from './InstallerStyles';
import { Formik } from 'formik';
import FormInput from '../../Components/FormInput/FormInput';
import FormBtn from '../../Components/FormBtn/FormBtn';
import Schemes from '../../Values/Schemes';
import Header from '../../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from '../../Values/Constants';
import Images from '../../Theme/Images';
import Colors from '../../Theme/Colors';
import RadioButton from '../../Components/RadioButton/RadioButton';

const InstallerScreen = ({ navigation }) => {
  //============================STATE==========================
  const [Tab, setTab] = useState(1);
  //============================Constants==========================
  const loading = false;
  const { INFORMATION_SCREEN } = CONSTANTS.Routes;
  const { Logo } = Images;
  //============================Functions==========================
  const handleSubmit = (e) => {
    navigation.navigate(INFORMATION_SCREEN);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header {...{ navigation }} />
      <Image source={Logo} style={styles.logoImg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <RadioButton
          onTabbarPress={setTab}
          {...{
            style: { marginTop: 10 },
            title1: 'نصب را خودم انجام میدهم',
            title2: 'نصب توسط تکنیسین شرکت انجام میشود.',
          }}
        />
        <FormBtn
          title={'تایید'}
          disabled={true}
          handleSubmit={handleSubmit}
          style={{ alignSelf: 'center', marginTop: 38 }}
        />
      </ScrollView>
    </View>
  );
};
export default InstallerScreen;
