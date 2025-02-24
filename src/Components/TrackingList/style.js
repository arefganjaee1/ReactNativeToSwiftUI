import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    width: '100%',
    ...Metrics.smallHorizontalPadding,
  },
  card: {
    height: 64,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
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
});
