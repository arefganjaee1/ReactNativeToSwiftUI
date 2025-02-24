import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateContainer: {
    height: 45,
    width: 198,
    backgroundColor: Colors.pelakbackground,
    borderRadius: 5,
    flexDirection: 'row',
  },
  left: {
    height: '100%',
    width: 29,
    backgroundColor: Colors.bluePelak,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  center: {
    height: '100%',
    width: 123,
    borderRightWidth: 1,
    borderRightColor: Colors.dark,
    flexDirection: 'row',
  },
  right: {
    height: '100%',
    width: 46,
  },
  top: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: '75%',
    width: '100%',
    padding: 3,
  },
  text: {
    ...Fonts.text_10,
    color: Colors.pelak,
  },
  input: {
    height: 19,
    width: 37,
    borderRadius: 5,
    backgroundColor: Colors.pelakInput,
    marginTop: 5,
  },
  centerBottom: {
    height: '75%',
    width: '100%',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
});
