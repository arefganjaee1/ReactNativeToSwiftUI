import { StyleSheet, I18nManager } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  Container: {
    height: 63,
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 100,
  },
  input: {
    textAlign: 'left',
    color: Colors.whiteText,
    fontSize: 12,
    paddingLeft: 5,
  },
  containerStyle: {
    ...Metrics.iconInput,
    alignSelf: 'center',
    height: 63,
    width: '70%',
  },
  inputContainerStyle: {
    height: 63,
    borderBottomWidth: 0,
  },
  TextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    ...Fonts.text_17,
    color: Colors.grayText3,
  },
});
