import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors, StyleHelpers } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';
export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight,
  },
  top: {
    height: hp('50%'),
    width: '100%',
  },
  back: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainContent: {
    marginTop: wp('2%'),
    alignItems: 'center',
    ...Metrics.mediumHorizontalPadding,
  },
  forgetPass: {
    marginTop: wp('5%'),
  },
  textCover: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  topText: {
    width: '45%',
  },
  forgetPassText: {
    ...Fonts.forgetPassText,
    color: Colors.whiteText,
    textAlign: 'center',
  },
  forgetPassTitleText: {
    ...Fonts.logInTitleText,
    color: Colors.whiteText,
    textAlign: 'center',
  },
  rowText: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: '50%',
    ...StyleHelpers.center,
  },
  rootCover: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
  root: {
    height: '100%',
    width: 320,
  },
  codeFieldRoot: {},
  cell: {
    width: 55,
    height: 57,
    lineHeight: 50,
    fontSize: 24,
    borderRadius: 9,
    textAlign: 'center',
    color: Colors.whiteText,
    backgroundColor: Colors.gray,
  },
  focusCell: {
    borderColor: Colors.lightBorder,
  },
  resend: {
    height: 100,
    width: '100%',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row-reverse',
    width: '100%',
  },
  resendText: {
    ...Fonts.text_14,
    color: Colors.light,
    textAlign: 'right',
  },
  logoImg: {
    width: 200,
    height: 49,
    marginTop: 60,
    marginBottom: 100,
    alignSelf: 'center',
  },
  text: {
    color: Colors.light,
    ...Fonts.text_14,
    textAlign: 'right',
    alignSelf: 'center',
    marginBottom: 11,
  },
});
