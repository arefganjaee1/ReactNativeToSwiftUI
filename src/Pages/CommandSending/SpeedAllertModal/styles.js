import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#000000',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
  },
  top: {
    width: '100%',
    justifyContent: 'center',
  },
  center: {
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottom: {
    width: '100%',
  },
  closeCover: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: '#212121',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subTitle: {
    ...Fonts.text_10,
    color: Colors.whiteText,
    textAlign: 'right',
    fontWeight: '600',
    lineHeight: 10,
  },
  submitBtn: {
    height: 25,
    width: 72,
    backgroundColor: Colors.green,
    ...StyleHelpers.center,
    alignSelf: 'flex-start',
  },
  rowBtn: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesBtn: {
    width: 41,
    height: 21,
    backgroundColor: Colors.green,
  },
  noBtn: {
    width: 41,
    height: 21,
    backgroundColor: Colors.red,
    marginRight: 10,
  },
});
