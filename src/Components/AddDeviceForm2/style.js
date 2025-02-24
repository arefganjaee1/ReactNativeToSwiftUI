import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  submitBtn: {
    width: 41,
    height: 21,
    backgroundColor: Colors.green
  },
  cancelBtn: {
    width: 41,
    height: 21,
    backgroundColor: Colors.red,
    marginRight: 10
  },
  empty: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectBtn: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    marginTop: 15,
    backgroundColor: Colors.grayDrawer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  rightSection: {
    width: '85%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  leftSection: {
    width: '15%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...Fonts.text_12,
    color: Colors.grayText2,
    textAlign: 'right',
    paddingRight: 12
  },
  errorText: {
    color: Colors.red,
    ...Fonts.text_13
  }
})
