import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Images from '../../Theme/Images';
import CONSTANTS from '../../Values/Constants';

const AllProducts = ({
  navigation,
  refreshProductListData,
  productMoreData,
  planName,
}) => {
  //============================STATE==========================
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  //============================Constants==========================

  useEffect(() => {
    if (productMoreData && !!productMoreData?.message?.length) {
      let cleanedJsonStr = productMoreData.message?.replace(/\//g, '');
      let data = JSON.parse(cleanedJsonStr);
      setProduct(data);
    }
  }, [productMoreData]);
  const { Star, ScalpingTrader } = Images;
  const { PRODUCT_DETAILS_SCREEN } = CONSTANTS.Routes;
  //============================Functions==========================
  const handleDetails = (item) => {
    navigation.navigate(PRODUCT_DETAILS_SCREEN, { item });
  };
  const handleOnRefresh = () => {
    setIsFetching(true);
    refreshProductListData();
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planName}</Text>
      <FlatList
        initialNumToRender={6}
        data={product}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleDetails(item)}
            style={styles.product}
          >
            <ScalpingTrader />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item?.pName}</Text>
              <View style={styles.row}>
                <Star style={styles.rate} />
                <Text style={styles.rateText}>(35)</Text>
              </View>
              <Text style={styles.price}>$ 15.00</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0.1}
        onRefresh={handleOnRefresh}
        refreshing={isFetching}
      />
    </View>
  );
};

export default AllProducts;
