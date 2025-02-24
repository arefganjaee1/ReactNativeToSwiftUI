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
    paddingBottom: 60,
    ...Metrics.mediumHorizontalPadding,
    marginTop: 30,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight,
  },

  logoImg: {
    width: 200,
    height: 49,
    marginTop: 20,
    alignSelf: 'center',
  },
  title: {
    marginTop: 30,
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_20,
  },
  textBtn: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 13,
  },
  text: {
    color: Colors.light,
    ...Fonts.text_14,
    textAlign: 'right',
    alignSelf: 'center',
    marginBottom: 14,
  },
});
