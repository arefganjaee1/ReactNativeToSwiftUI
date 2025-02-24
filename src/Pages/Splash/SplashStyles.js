import {StyleSheet} from 'react-native';
import {StyleHelpers, Fonts, Colors, Metrics} from '../../Theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.main,
    ...StyleHelpers.center,
  },
  title: {
    color: Colors.whiteText,
    ...Fonts.title,
  },
});
