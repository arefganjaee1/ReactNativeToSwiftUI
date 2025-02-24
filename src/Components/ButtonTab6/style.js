import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default StyleSheet.create({
  buttonContainer: {
    width: width,
    height: 95,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
    // borderRadius: 20
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
