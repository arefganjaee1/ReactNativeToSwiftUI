import { Dimensions, StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

const DrawerMenuWidth = Dimensions.get('window').width
const height = Dimensions.get('window').height
const heightSize = height - StatusBar.currentHeight
const statusBar = StatusBar.currentHeight
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
    justifyContent: 'flex-end'
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
    ...Fonts.text_13,
    color: Colors.light,
    textAlign: 'right',
    paddingRight: 13
  }
})
