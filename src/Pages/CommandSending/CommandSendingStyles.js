import { StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, StyleHelpers } from '../../Theme'
export default styles = StyleSheet.create({
  scrol: {
    width: '100%',
    paddingBottom: 50,
    ...Metrics.mediumHorizontalPadding
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },

  phoneNumberContainer: {
    height: 93,
    width: '100%',
    borderRadius: 15,
    backgroundColor: Colors.gray,
    padding: 12
  },
  phoneNumberTopSection: {
    justifyContent: 'flex-end',
    height: '50%',
    width: '100%',
    paddingBottom: 10
  },
  phoneNumberBottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
    width: '100%'
  },
  submitText: {
    ...Fonts.text_10,
    color: Colors.light
  },
  title: {
    ...Fonts.text_10,
    color: Colors.light
  },
  collapsContainer: {
    width: '100%',
    paddingHorizontal: 24
  },
  collapsText: {
    ...Fonts.text_10,
    color: Colors.light,
    textAlign: 'right'
  },
  switchContainer: {
    alignSelf: 'flex-start'
  },
  submitContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10
  },
  submitBtn: {
    alignSelf: 'Left',
    width: 60,
    height: 25,
    backgroundColor: Colors.green
  },
  radioButton: {
    height: 25,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
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
  noDeveceSelected: {
    height: '100%',
    width: '100%',
    ...StyleHelpers.center
  },
  noDevoceText: {
    ...Fonts.text_10,
    color: Colors.light
  }
})
