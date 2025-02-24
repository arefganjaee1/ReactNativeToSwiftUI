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
    paddingBottom: 50,
    ...Metrics.mediumHorizontalPadding,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight,
  },
});
