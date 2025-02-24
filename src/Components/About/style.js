import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    // height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    paddingHorizontal: 50,
  },
  section: {
    paddingVertical: 10,
  },
  aboutText: {
    color: Colors.whiteText,
    ...Fonts.aboutText,
  },
  aboutTitleText: {
    color: Colors.orange,
    ...Fonts.aboutTitleText,
  },
});
