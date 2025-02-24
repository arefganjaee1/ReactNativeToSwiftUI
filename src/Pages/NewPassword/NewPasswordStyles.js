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
    height: 49,
    alignSelf: 'center'
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_20
  },
  text: {
    color: Colors.grayText2,
    ...Fonts.text_12,
    marginBottom: 20
  }
})
