import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors, StyleHelpers } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';
export default styles = StyleSheet.create({
  scrol: {
    width: '100%',
    height: 650,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight,
  },
  inventoryContainer: {
    marginTop: 30,
    ...Metrics.mediumHorizontalMargin,
  },
  inventory: {
    height: 85,
    width: '100%',
    backgroundColor: Colors.orange,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  title: {
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_19,
  },
  chargeContainer: {
    height: 526,
    width: '100%',
    backgroundColor: Colors.grayBackground,
    marginTop: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  chargeTitle: {
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_20,
  },

  inventoryTitle: {
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_12,
    marginTop: 30,
  },
  rowPrice: {
    height: 51,
    width: '100%',
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    height: 51,
    width: 228,
    borderRadius: 30,
    backgroundColor: Colors.gray,
    marginHorizontal: 10,
  },
  inputContainerStyle: {
    height: 51,
    width: 228,
    borderRadius: 30,
  },
  containerStyle: {
    height: 51,
    width: 228,
    borderRadius: 30,
  },
  amountTitle: {
    color: Colors.light,
    ...Fonts.text_15,
  },
  btnContainer: {
    height: 51,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
});
