import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styles from './style';
import MainTextInput from '../../Components/MainTextInput/MainTextInput';
import Btn from '../../Components/Btn/Btn';

const ContactUs = ({ navigation, style, image }) => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

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
              <Text style={styles.profileText}>Subject : </Text>
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
              <Text style={styles.profileText}>Name : </Text>
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
          <View style={styles.row}>
            <View style={styles.titles}>
              <Text style={styles.profileText}>Tel : </Text>
            </View>
            <View style={styles.inputs}>
              <MainTextInput
                inputContainerStyle={{
                  marginLeft: -10,
                  marginRight: -10,
                }}
                handleValue={setValue3}
                value={value3}
              />
            </View>
          </View>

          <View style={[styles.row, { height: 110 }]}>
            <View
              style={[
                styles.titles,
                { justifyContent: 'flex-start', paddingTop: 5 },
              ]}
            >
              <Text style={styles.profileText}>Comment : </Text>
            </View>
            <View
              style={[styles.inputs, { paddingLeft: 10, paddingRight: 15 }]}
            >
              <TextInput
                style={styles.textInput}
                multiline
                onChangeText={(text) => setValue4(text)}
                value={value4}
                underlineColorAndroid="transparent"
                placeholderTextColor="#C7C7C7"
              />
            </View>
          </View>
          <View style={[styles.row, { height: 80 }]}>
            <View style={styles.titles}></View>
            <View style={styles.inputs}>
              <Btn
                title={'Submit'}
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

export default ContactUs;
