import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  input: {
    color: Colors.whiteText,
    fontWeight: '400',
    paddingRight: 10,
    ...Fonts.text_13,
    textAlign: 'right',
    paddingTop: 0,
    height: 100,
    alignSelf: 'flex-end'
    // backgroundColor: 'pink',
  },
  inputContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    height: 100,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: 'flex-end',
    marginTop: 15
  },
  Container: {
    width: '100%',
    height: 100
  },
  errorText: {
    top: 17,
    fontSize: 13,
    color: Colors.red
  }
})
