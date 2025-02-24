import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: Colors.dark,
  },
  back: {
    padding: 6,
    marginLeft: 21,
    marginTop: 25,
    width: 24,
    height: 24,
  },
});
