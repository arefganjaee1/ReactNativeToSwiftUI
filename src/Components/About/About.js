import React, { memo, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import { Colors } from '../../Theme';
import { useProductDetailApi } from '../../Hooks/Api/useProductDetailApi';
import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error/Error';

const About = ({ pCode, pCode2, pCode3 }) => {
  //============================STATE==========================
  const productDetailData = useSelector(
    (state) => state.productDetail.productDetailData
  );
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const [about, setAbout] = useState({});
  //============================Constants==========================
  const { handleProductDetailApi, netInfo } = useProductDetailApi();
  const date = about?.pdate ?? '2023-09-12T23:27:45.96';
  const dateObject = new Date(date);
  const formattedDate = dateObject
    ?.toISOString()
    ?.replace('T', ' ')
    .slice(0, 19);
  console.log('pCode >>>>', pCode);

  //============================Functions==========================
  const fetchAboutData = () => {
    let data = {
      pcode: pCode ?? pCode2 ?? pCode3,
      typ: 'about',
    };
    handleProductDetailApi(data);
  };
  useEffect(() => {
    fetchAboutData();
  }, []);

  useEffect(() => {
    if (productDetailData && !!productDetailData.message.length) {
      let cleanedJsonStr = productDetailData.message?.replace(/\//g, '');
      let data = JSON.parse(cleanedJsonStr);
      setAbout(...data);
    }
  }, [productDetailData]);

  const handleContent = () => {
    if (netInfo) {
      if (error === '') {
        if (loading) {
          return <Loading color={Colors.light} />;
        } else {
          return (
            <View style={styles.container}>
              <View style={[styles.section, { marginTop: 20 }]}>
                <Text style={styles.aboutTitleText}>Start in Homoro :</Text>
                <Text style={styles.aboutText}>{formattedDate ?? '???'}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.aboutTitleText}>owner :</Text>
                <Text style={styles.aboutText}>
                  {about?.ownernickname ?? '???'}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.aboutTitleText}>Price :</Text>
                <Text style={styles.aboutText}>
                  Monthly: ${about?.MonthlyPrice ?? '???'} - Practical: $
                  {about?.YearlyPrice ?? '???'}
                </Text>
              </View>
            </View>
          );
        }
      } else {
        return <Error FetchData={fetchAboutData} />;
      }
    } else {
      return <Error FetchData={fetchAboutData} />;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: '100%',
        paddingBottom: 70,
      }}
    >
      {handleContent()}
    </ScrollView>
  );
};

export default memo(About);
