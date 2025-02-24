import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
  },
  labelsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  label: {
    height: 20,
    alignItems: 'center',
  },
  selectedLabel: {
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 30,
  },
  text: {
    ...Fonts.text_10,
    color: '#6C6C6C',
  },
  selectText: {
    ...Fonts.text_10,
    color: '#92908A',
  },
});
