import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Colors.orange,
    width: 113,
    borderRadius: 1000,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtn: {
    ...Fonts.text_16,
    color: Colors.light,
    fontWeight: '400'
  }
})
