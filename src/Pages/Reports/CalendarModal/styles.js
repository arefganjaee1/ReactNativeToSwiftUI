import { StyleSheet } from 'react-native'
import { Colors, Fonts, StyleHelpers } from '../../../Theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: -1
  },
  top: {
    width: '100%',
    justifyContent: 'center'
  },
  center: {
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bottom: {
    width: '100%'
  },
  closeCover: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#515151',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...Fonts.text_32,
    color: Colors.whiteText,
    textAlign: 'center'
  },
  subTitle: {
    ...Fonts.text_18,
    color: Colors.whiteText,
    textAlign: 'right',
    lineHeight: 24
  },
  submitBtn: {
    paddingHorizontal: 2,
    height: 25,
    backgroundColor: Colors.green,
    ...StyleHelpers.center,
    alignSelf: 'center'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})
