import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  input: {
    textAlign: 'right',
    color: Colors.whiteText,
    fontWeight: '400',
    paddingRight: 10,
    ...Fonts.text_14
  },
  inputContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.gray
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  errorText: {
    top: 5,
    color: Colors.red,
    ...Fonts.text_13
  }
})
