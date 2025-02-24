import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, StyleHelpers } from '../../Theme'

export default StyleSheet.create({
  container: {
    paddingBottom: 15,
    width: '100%',
    ...Metrics.mediumHorizontalPadding
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: Colors.grayDrawer,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    paddingVertical: 13
  },
  leftSection: {
    height: '100%',
    width: '50%',
    borderRightWidth: 2,
    borderRightColor: Colors.grayBorder,
    paddingHorizontal: 10
  },
  rightSection: {
    height: '100%',
    width: '50%',
    paddingHorizontal: 10
  },

  rowText: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%'
  },
  text: {
    ...Fonts.text_10,
    color: Colors.light,
    paddingBottom: 7,
    textAlign: 'right'
  },
  rowText2: {
    flexDirection: 'column', // RTL (Right-to-Left) layout
    justifyContent: 'flex-start', // Aligns items to the start
    width: '100%'
  },
  text2: {
    ...Fonts.text_10,
    color: Colors.light,
    paddingBottom: 7,
    flexShrink: 0,
    textAlign: 'right'
  },
  addressContainer: {
    paddingLeft: 10,
    flex: 1 // Takes up remaining space in the row
  },
  addressText: {
    ...Fonts.text_10,
    color: Colors.light,
    paddingBottom: 7,
    flexShrink: 1, // Allows text to shrink to fit within the available space
    flexWrap: 'wrap', // Ensures text wraps within the container
    textAlign: 'right'
  },
  rowIcons: {
    flexDirection: 'row'
  },
  iconCover: {
    paddingRight: 10
  },
  rowbtns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 10
  },
  btn: {
    height: 18,
    width: 50,
    backgroundColor: Colors.orange,
    borderRadius: 100,
    ...StyleHelpers.center,
    marginRight: 10
  },
  btnText: {
    ...Fonts.text_8,
    color: Colors.light
  },
  statusBtn: {
    height: 18,
    width: 50,
    backgroundColor: Colors.btnBg,
    borderRadius: 100,
    ...StyleHelpers.center,
    flexDirection: 'row'
  },
  statusBtnText: {
    ...Fonts.text_8,
    color: Colors.redText
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginLeft: 3,
    backgroundColor: Colors.red
  }
})
