import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'

export default styles = StyleSheet.create({
  Container: {
    height: 57,
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 100,
    paddingRight: 10
  },
  input: {
    textAlign: 'left',
    color: Colors.whiteText,
    ...Fonts.text_14,
    paddingLeft: 5
  },
  containerStyle: {
    ...Metrics.iconInput,
    alignSelf: 'center',
    height: 57,
    width: '90%'
  },
  inputContainerStyle: {
    height: 57,
    borderBottomWidth: 0
  },
  TextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 10,
    color: Colors.light
  }
})
