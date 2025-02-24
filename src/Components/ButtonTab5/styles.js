import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  toggle: {
    height: 100,
    width: '100%',
  },
  itemBtn: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    width: 217,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    ...Fonts.text_14,
    color: Colors.light,
    paddingRight: 10,
  },
});
