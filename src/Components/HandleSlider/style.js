import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 35,
    justifyContent: 'space-between',
  },
  sliderValueText: {
    ...Fonts.text_8,
    color: Colors.light,
  },
  sliderText: {
    width: '13%',
    height: '100%',
    justifyContent: 'center',
  },
});
