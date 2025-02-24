import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    width: '100%',
    ...Metrics.smallHorizontalPadding,
  },

  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    marginLeft: 20,
  },
  productTitle: {
    ...Fonts.productTitle,
    color: Colors.whiteText,
  },
  rate: {
    paddingVertical: 10,
  },
  rateText: {
    ...Fonts.priceText,
    color: Colors.whiteText,
    marginLeft: 20,
  },
  price: {
    ...Fonts.priceText,
    color: Colors.whiteText,
  },
  title: {
    marginLeft: 15,
    marginTop: 20,
    color: Colors.whiteText,
  },
});
