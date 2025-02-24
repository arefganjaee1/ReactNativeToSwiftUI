import React, { memo, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import MainTextInput from '../../Components/MainTextInput/MainTextInput';
import Btn from '../../Components/Btn/Btn';
import HandleDropdown2 from '../../Components/HandleDropdown2/HandleDropdown2';
import json from '../../../Json/json';
import { useWalletListApi } from '../../Hooks/Api/useWalletListApi';
import { useGetExchangesApi } from '../../Hooks/Api/useExchangesListApi';
import { useConnectWalletApi } from '../../Hooks/Api/useConnectWalletApi';
import { useAddWalletApi } from '../../Hooks/Api/useAddWalletApi';
import { useSelector } from 'react-redux';

const AddNewWallet2 = ({ puCode }) => {
  //============================STATE==========================
  const token = useSelector((state) => state.token.token);
  const walletListData = useSelector(
    (state) => state.getWalletList.walletListData
  );
  const getExchangesData = useSelector(
    (state) => state.getExchanges.getExchangesData
  );
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [walletList, setWalletList] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);
  //============================Constants==========================
  const { handleWalletListApi } = useWalletListApi();
  const { handleGetExchangesApi } = useGetExchangesApi();
  const { handleConnectWalletApi } = useConnectWalletApi();
  const { handleAddWalletApi } = useAddWalletApi();
  const userProps = {
    data: exchangeList,
    value,
    handleChange: (item) => handleChange(item),
  };
  const userProps2 = {
    data: walletList,
    value: value2,
    style: { width: 180 },
    handleChange: (item) => handleChange2(item),
  };

  //============================Functions==========================
  const addWallet = (item) => {
    let data = {
      puCode: puCode,
      walletName: 'MyMexc',
      apiKey: 'aaa',
      apiSecret: 'aaa',
      passPhrase: 'string',
      fApiKey: 'string',
      fApiSecret: 'string',
      fPassPhrase: 'string',
      exchangeId: value,
      sBalance: 0,
      fBalance: 0,
      faBalance: 0,
    };
    handleAddWalletApi(data);
  };
  const connectWallet = (item) => {
    let data = {
      puCode: puCode,
      walletid: value2,
    };
    handleConnectWalletApi(data);
  };
  const getExchangesListData = () => {
    let data = {
      token: token,
    };
    handleGetExchangesApi(data);
  };
  useEffect(() => {
    handleWalletListApi();
    getExchangesListData();
  }, []);

  useEffect(() => {
    const convertedArray = walletListData?.map((item) => ({
      label: item?.walletName,
      value: item?.walletId,
    }));
    if (!!convertedArray) {
      setWalletList([...convertedArray]);
    }
  }, [walletListData]);

  useEffect(() => {
    const convertedArray = getExchangesData?.map((item) => ({
      label: item?.exchange,
      value: item?.id,
    }));
    if (!!convertedArray) {
      setExchangeList([...convertedArray]);
    }
  }, [getExchangesData]);

  const handleChange = (item) => {
    setValue(item.value);
  };
  const handleChange2 = (item) => {
    setValue2(item.value);
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
              <Text style={styles.profileText}>From List :</Text>
            </View>
            <View style={[styles.inputs]}>
              <HandleDropdown2 {...userProps2} />
              <TouchableOpacity
                onPress={() => connectWallet()}
                style={styles.connect}
              >
                <Text style={styles.connectText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.titles, { width: '100%' }]}>
              <Text
                style={[
                  styles.profileText,
                  { textAlign: 'left', marginLeft: 30 },
                ]}
              >
                or, Add New Wallet
              </Text>
            </View>
          </View>

          <View style={[styles.row]}>
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
                handleValue={() => setValue3()}
                value={value3}
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
                handleValue={() => setValue4()}
                value={value4}
              />
            </View>
          </View>

          <View style={[styles.row, { height: 80 }]}>
            <View style={styles.titles}></View>
            <View style={styles.inputs}>
              <Btn
                title={'Add Wallet'}
                style={styles.btn}
                handleSubmit={() => addWallet()}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default memo(AddNewWallet2);
