import { StyleSheet, I18nManager } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';

export default styles = StyleSheet.create({
  input: {
    textAlign: 'left',
    color: Colors.whiteText,
    ...Fonts.text_15,
  },
  containerStyle: {
    width: 34,
    height: 24,
  },
  inputContainerStyle: {
    height: 24,
    width: 20,
    borderBottomWidth: 0,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 34,
  },
});
