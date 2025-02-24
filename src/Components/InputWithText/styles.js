import { StyleSheet, I18nManager } from 'react-native';
import { Metrics, Colors } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  Container: {
    height: 44,
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 15,
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
    height: 44,
    width: '100%',
  },
  inputContainerStyle: {
    height: 44,
    borderBottomWidth: 0,
  },
  TextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 10,
    color: Colors.light,
  },
});
