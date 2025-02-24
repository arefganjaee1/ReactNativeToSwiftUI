import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    ...Fonts.text_13,
    color: Colors.whiteText,
  },
  retrytText: {
    ...Fonts.text_13,
    color: Colors.light,
  },
  button: {
    paddingHorizontal: 10,
    height: 30,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
