import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    height: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  toggle: {
    height: 32,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBtn: {
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBackground,
    borderRadius: 100,
  },

  title: {
    fontSize: 16,
    color: Colors.light,
  },
});
