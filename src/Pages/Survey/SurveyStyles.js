import { Dimensions, StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors, StyleHelpers } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

// const heightSize = hp('100%') - 200 - StatusBar.currentHeight;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const heightSize = height - 244 - StatusBar.currentHeight;
export default StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
  },
  buttonContainer: {
    width: width,
    height: 85,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    width: '22%',
    height: '100%',
    backgroundColor: 'pink',
  },
  menue: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
