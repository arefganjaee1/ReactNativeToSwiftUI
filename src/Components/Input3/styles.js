import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  input: {
    textAlign: 'right',
    color: Colors.whiteText,
    ...Fonts.text_14
  },
  containerStyle: {
    width: '100%',
    height: 100
  },
  inputContainerStyle: {
    height: 100,
    width: '100%',
    borderBottomWidth: 0
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
})
