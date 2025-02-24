import { StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'
export default styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: Colors.dark
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },
  mainContent: {
    ...Metrics.mediumHorizontalPadding
  },
  logoImg: {
    width: 200,
    height: 55,
    alignSelf: 'center'
  },
  title: {
    marginTop: 30,
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_20
  },
  textBtn: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 13
  },
  text: {
    color: Colors.light,
    ...Fonts.text_14,
    textAlign: 'right',
    alignSelf: 'center',
    marginBottom: 14
  }
})
