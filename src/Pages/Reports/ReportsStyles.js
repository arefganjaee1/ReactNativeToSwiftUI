import { StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'
export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },
  text: {
    ...Fonts.text_19,
    color: Colors.orange,
    textAlign: 'center',
    marginTop: 100
  },
  filterSection: {
    ...Metrics.mediumHorizontalPadding
  },

  filterButtonsContainer: {
    height: 67,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  filterButton: {
    height: '100%',
    width: 84,
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
    ...Fonts.text_6,
    color: Colors.light,
    paddingTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 110,
    width: '100%',
    backgroundColor: Colors.reportsGray,
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row'
  },
  footerBorder: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 111,
    width: '100%',
    backgroundColor: Colors.reportBorder,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  footerItem: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    paddingVertical: 5
  },
  footerText: {
    ...Fonts.text_11,
    color: Colors.light,
    fontWeight: '600',
    marginTop: 2
  },
  footerText2: {
    ...Fonts.text_9,
    color: Colors.light
  },
  button: {
    height: 51,
    width: '100%',
    backgroundColor: Colors.grayDrawer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 25
  },
  buttonText: {
    ...Fonts.text_12,
    color: Colors.light,
    textAlign: 'right'
  },
  radioButton: {
    height: '100%',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 9,
    paddingHorizontal: 14,
    marginBottom: 10
  },

  title: {
    ...Fonts.text_11,
    color: Colors.whiteText,
    marginRight: 15
  },
  toggle: {
    height: 25,
    width: '100%',
    flexDirection: 'column'
  },
  scrollViewContent: {
    height: 170
  },
  emptyText: {
    ...Fonts.text_20,
    color: Colors.light
  }
})
