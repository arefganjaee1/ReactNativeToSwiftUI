import { Metrics, Colors, StyleHelpers, Fonts } from '../../Theme';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  BtnContainer: {
    width: '100%',
    height: 33,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textBtn: {
    color: Colors.darkText,
    ...Fonts.btn,
  },
});
