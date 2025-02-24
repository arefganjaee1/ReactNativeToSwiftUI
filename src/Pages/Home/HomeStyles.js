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
    // height: height,
    // width: width,
    flex: 1,
    backgroundColor: Colors.dark,
  },
  contentContainer: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.dark,
  },
  content: {
    width: '100%',
    height: 1000,
    backgroundColor: Colors.dark,
    paddingHorizontal: 10,
  },
  menue: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 80,
    right: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  //track
  card: {
    height: 118,
    width: '100%',
    marginTop: 15,
    backgroundColor: Colors.grayDrawer,
    borderRadius: 10,
  },
  rightSection: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSection: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
  },
  title: {
    ...Fonts.text_10,
    color: Colors.whiteText,
  },
  description: {
    ...Fonts.text_9,
    color: Colors.whiteText,
    paddingRight: 4,
  },
  rowText: {
    flexDirection: 'row-reverse',
    marginBottom: 4,
  },
  topButton: {
    marginTop: 15,
    height: 24,
    width: 154,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
