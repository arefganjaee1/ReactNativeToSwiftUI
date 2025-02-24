import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
  },
  toggle: {
    height: 51,
    width: '100%',
    flexDirection: 'column',
  },
  first: {
    height: '100%',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 9,
    backgroundColor: Colors.gray,
    paddingHorizontal: 14,
  },
  second: {
    height: '100%',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 9,
    backgroundColor: Colors.gray,
    marginTop: 10,
    paddingHorizontal: 14,
  },
  third: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.whiteText,
  },
  filledRadioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.orange,
    marginRight: 15,
  },
  emptyRadioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: Colors.orange,
    borderWidth: 1,
    marginRight: 15,
  },
});
