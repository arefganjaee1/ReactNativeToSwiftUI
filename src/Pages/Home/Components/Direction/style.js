import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../Theme'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    top: 100,
    left: 20
  },
  button: {
    backgroundColor: '#282828',
    height: 40,
    width: 40,
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
    justifyContent: 'center'
  },
  carCover: {
    height: 45,
    width: 45,
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
