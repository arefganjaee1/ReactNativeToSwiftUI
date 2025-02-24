import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemBtn: {
    height: 26,
    width: 81,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 5,
    marginLeft: 10,
  },
  title: {
    ...Fonts.text_9,
    color: Colors.light,
  },
});
