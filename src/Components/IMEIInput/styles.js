import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'

export default styles = StyleSheet.create({
  Container: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 100,
    alignItems: 'center'
  },
  input: {
    textAlign: 'right',
    color: Colors.whiteText,
    ...Fonts.text_13
  },
  containerStyle: {
    ...Metrics.iconInput,
    height: 67,
    width: '88%'
  },
  inputContainerStyle: {
    height: 67,
    borderBottomWidth: 0,
    width: '100%',
    marginLeft: 5
  },
  TextContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  text: {
    ...Fonts.text_17,
    color: Colors.grayText3
  },
  errorText: {
    top: 5,
    color: Colors.red,
    ...Fonts.text_13
  }
})
