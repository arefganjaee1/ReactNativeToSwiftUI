import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  radioButton: {
    height: 25,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  title: {
    ...Fonts.text_11,
    color: Colors.whiteText,
    marginRight: 15,
  },
  title2: {
    ...Fonts.text_12,
    color: Colors.light,
    textAlign: 'right',
    paddingRight: 13,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: Colors.grayDrawer,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
  },
  headerContent: {
    width: '100%',
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  iconContainer: {
    width: '15%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
