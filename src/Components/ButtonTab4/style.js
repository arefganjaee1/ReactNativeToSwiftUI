import { Dimensions, StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  Container: {
    height: 67,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rowBtn: {
    height: 51,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  itemBtn: {
    height: 51,
    width: 133,
    borderRadius: 100,
    backgroundColor: Colors.gray,
    ...StyleHelpers.center,
  },
  price: {
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_21,
  },
});
