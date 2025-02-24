import { StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'
export default styles = StyleSheet.create({
  scrol: {
    width: '100%',
    height: 700,
    ...Metrics.mediumHorizontalPadding,
    marginTop: 30
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },
  logoImg: {
    width: 200,
    height: 49,
    marginTop: 20,
    alignSelf: 'center'
  },
  headerTitle: {
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
  },
  menue: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    right: 20,
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
    justifyContent: 'flex-start',
    padding: 12
  },
  rightSection: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    ...Fonts.text_12,
    color: Colors.grayText2,
    textAlign: 'right',
    paddingRight: 12
  }
})
