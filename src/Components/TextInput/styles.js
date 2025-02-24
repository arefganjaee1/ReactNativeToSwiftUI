import {StyleSheet, I18nManager} from 'react-native';
import {StyleHelpers, Fonts, Colors, Metrics} from '../../Theme';

export default styles = StyleSheet.create({
  input: {
    textAlign: 'right',
    color: '#4F44FF',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'IRANYekanMobileRegular',
  },
  inputContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    height: 42,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white',
  },
});
