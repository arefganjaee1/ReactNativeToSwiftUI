import { Dimensions, StatusBar, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

const DrawerMenuWidth = Dimensions.get('window').width
const height = Dimensions.get('window').height
const heightSize = height
const statusBar = StatusBar.currentHeight
export default styles = StyleSheet.create({
  drawerContainer: {
    ...StyleSheet.absoluteFillObject,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999
  },
  drawer: {
    width: '100%',
    height: heightSize,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  drawerMain: {
    width: '60%',
    height: '100%',
    backgroundColor: Colors.grayDrawer,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 24
  },
  drawerClose: {
    width: '40%',
    height: '100%',
    alignItems: 'flex-end'
  },
  textTitle: {
    ...Fonts.input,
    color: 'white',
    fontSize: 14,
    fontFamily: 'IRANYekanMobileRegular'
  },
  accountName: {
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})
