import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  Container: {
    height: 67,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  itemBtn: {
    height: '100%',
    width: '24%',
    borderRadius: 10,
    backgroundColor: Colors.grayDrawer
  },
  iconCover: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textCover: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btnText: {
    ...Fonts.text_10,
    color: Colors.light,
    paddingTop: 10
  },
  submitText: {
    ...Fonts.text_10,
    color: Colors.light
  },
  submit: {
    backgroundColor: Colors.green,
    alignSelf: 'flex-end',
    width: '22%'
  }
})
