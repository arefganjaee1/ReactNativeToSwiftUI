import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import MainTextInput from '../../Components/MainTextInput/MainTextInput';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import Btn from '../../Components/Btn/Btn';
import HandleDropdown2 from '../../Components/HandleDropdown2/HandleDropdown2';
import json from '../../../Json/json';
const AddNewWallet = ({ navigation, style, image }) => {
  const { person } = json;
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const handleChange = (item) => {
    setValue(item.value);
  };
  const userProps = {
    data: person,
    value,
    handleChange: (item) => handleChange(item),
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: '100%',
      }}
    >
      <KeyboardAvoidingView style={{ width: '100%' }} behavior={'padding'}>
        <View style={styles.container}>
          <View style={[styles.row, { marginTop: 20 }]}>
            <View style={styles.titles}>
              <Text style={styles.profileText}>Exchange : </Text>
            </View>
            <View style={styles.inputs}>
              <HandleDropdown2 {...userProps} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titles}>
              <Text style={styles.profileText}>Api Key : </Text>
            </View>
            <View style={styles.inputs}>
              <MainTextInput
                inputContainerStyle={{
                  marginLeft: -10,
                  marginRight: -10,
                }}
                handleValue={setValue1}
                value={value1}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titles}>
              <Text style={styles.profileText}>Secret Key : </Text>
            </View>
            <View style={styles.inputs}>
              <MainTextInput
                inputContainerStyle={{
                  marginLeft: -10,
                  marginRight: -10,
                }}
                handleValue={setValue2}
                value={value2}
              />
            </View>
          </View>

          <View style={[styles.row, { height: 80 }]}>
            <View style={styles.titles}></View>
            <View style={styles.inputs}>
              <Btn
                title={'Add Wallet'}
                style={{
                  marginTop: 30,
                  width: '100%',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddNewWallet;
