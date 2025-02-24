import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    width: '100%',
    padding: 30,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#202523',
  },
  top: {
    height: 50,
    width: '100%',
    backgroundColor: '#202523',
    justifyContent: 'center',
  },
  center: {
    height: 152,
    width: '100%',
    backgroundColor: '#202523',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: 150,
    width: '100%',
    backgroundColor: '#202523',
  },
  closeCover: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#333131',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Fonts.text_32,
    color: Colors.whiteText,
    textAlign: 'center',
  },
  subTitle: {
    ...Fonts.text_18,
    color: Colors.whiteText,
    textAlign: 'center',
    lineHeight: 24,
  },
});
