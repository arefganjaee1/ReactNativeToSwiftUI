import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
  },
  toggle: {
    height: 25,
    width: '100%',
    flexDirection: 'column',
  },
  radioButton: {
    height: '100%',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 9,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  title: {
    ...Fonts.text_11,
    color: Colors.whiteText,
    marginRight: 15,
  },
});
