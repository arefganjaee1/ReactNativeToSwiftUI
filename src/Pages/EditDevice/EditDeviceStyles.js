import { StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Theme'
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

  notif: {
    height: 154,
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 15
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
