import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  back: {
    padding: 6,
    marginTop: 2,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    padding: 6,
    marginTop: 2,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
