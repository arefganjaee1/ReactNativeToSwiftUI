import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../Theme'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    top: 80,
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
    justifyContent: 'center',
    paddingBottom: 50
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
