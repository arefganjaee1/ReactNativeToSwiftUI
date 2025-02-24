import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default StyleSheet.create({
  buttonContainer: {
    width: width,
    height: 75,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.dark
  },
  iconCover: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCover: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    width: '22%',
    height: 65,
    backgroundColor: Colors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: Colors.light,
    ...Fonts.text_11
  }
})
