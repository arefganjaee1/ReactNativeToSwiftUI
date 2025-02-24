import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  input: {
    textAlign: 'left',
    color: Colors.whiteText,
    ...Fonts.text_14
  },
  containerStyle: {
    width: 34,
    height: 24
  },
  inputContainerStyle: {
    height: 24,
    width: 20,
    borderBottomWidth: 0
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 34
  }
})
