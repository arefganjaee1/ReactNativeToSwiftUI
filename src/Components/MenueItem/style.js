import {StyleSheet} from 'react-native';
import {StyleHelpers, Fonts, Colors, Metrics} from '../../Theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'flex-end',
  },
  textTitle: {
    ...Fonts.input,
    color: 'white',
    fontSize: 14,
    fontFamily: 'IRANYekanMobileRegular',
  },
  title: {
    height: '100%',
    paddingRight: 7,
    ...StyleHelpers.center,
  },
  right: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
