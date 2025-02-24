import { StyleSheet } from 'react-native'
import { Colors, Fonts, StyleHelpers } from '../../../Theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#000000',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8
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
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: '#212121',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },

  subTitle: {
    ...Fonts.text_12,
    color: Colors.whiteText,
    textAlign: 'right',
    fontWeight: '600',
    marginTop: 5
  },
  yesBtn: {
    height: 25,
    width: 72,
    backgroundColor: Colors.green,
    ...StyleHelpers.center,
    alignSelf: 'flex-start'
  },
  rowBtn: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    height: 27,
    width: 40,
    backgroundColor: Colors.green,
    ...StyleHelpers.center,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    paddingHorizontal: 8
  },
  itemText: {
    ...Fonts.text_14,
    color: Colors.light
  },
  itemText2: {
    ...Fonts.text_10,
    color: Colors.orange
  },
  input: {
    height: 24,
    width: 34,
    backgroundColor: '#999999',
    borderRadius: 5
  }
})
