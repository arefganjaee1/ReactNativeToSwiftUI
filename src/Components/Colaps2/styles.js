import { StyleSheet } from 'react-native'
import { Colors, Fonts, StyleHelpers } from '../../Theme'

export default styles = StyleSheet.create({
  iconContainer: {
    width: '15%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    width: '100%',
    backgroundColor: Colors.grayDrawer,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15
  },
  rightContainer: {
    width: '85%',
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerContent: {
    width: '100%',
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  title: {
    ...Fonts.text_12,
    color: Colors.light,
    textAlign: 'right'
  },
  more: {
    width: '100%',
    height: 120,
    paddingHorizontal: 12
  },
  items: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  check: {
    paddingHorizontal: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    marginLeft: 3
  },
  description: {
    width: '100%',
    height: 15,
    justifyContent: 'center'
  },
  descText: {
    ...Fonts.text_9,
    color: Colors.notificationGray
  },
  submitContainer: {
    width: '100%',
    height: 35,
    justifyContent: 'flex-start',
    paddingHorizontal: 12
  },
  submitBtn: {
    alignSelf: 'Left',
    width: 50,
    height: 25
  },
  statusBtnOn: {
    height: 18,
    width: 50,
    backgroundColor: Colors.lightGreen,
    borderRadius: 100,
    ...StyleHelpers.center,
    flexDirection: 'row'
  },
  statusBtnOff: {
    height: 18,
    width: 50,
    backgroundColor: '#FFD3D3',
    borderRadius: 100,
    ...StyleHelpers.center,
    flexDirection: 'row'
  },
  statusBtnTextOn: {
    ...Fonts.text_8,
    color: Colors.green
  },
  statusBtnTextOff: {
    ...Fonts.text_8,
    color: Colors.red
  },
  dotOn: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginLeft: 3,
    backgroundColor: Colors.green
  },
  dotOff: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginLeft: 3,
    backgroundColor: Colors.red
  },
  btnTitle: {
    ...Fonts.text_12,
    alignSelf: 'center'
  }
})
