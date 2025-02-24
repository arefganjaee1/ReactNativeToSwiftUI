import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
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
    marginBottom: 15,
  },

  bottom: {
    width: '100%',
  },
  closeCover: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: '#515151',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    ...Fonts.text_11,
    color: Colors.whiteText,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
  },
  rowBtn: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesBtn: {
    width: 46,
    height: 21,
    backgroundColor: Colors.green,
  },
  noBtn: {
    width: 46,
    height: 21,
    backgroundColor: Colors.red,
    marginRight: 10,
  },
});
