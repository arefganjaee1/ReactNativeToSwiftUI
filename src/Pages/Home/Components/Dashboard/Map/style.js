import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../../Theme'

export default StyleSheet.create({
  map: {
    height: 150,
    width: '100%',
    borderRadius: 20
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#282828',
    height: 20,
    width: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
  },
  carCover: {
    height: 25,
    width: 25,
    borderRadius: 6,
    backgroundColor: Colors.orange,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableText: {
    color: Colors.orange,
    ...Fonts.text_15
  }
})
