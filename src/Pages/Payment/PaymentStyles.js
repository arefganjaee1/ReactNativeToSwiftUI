import { StatusBar, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
const heightSize = hp('100%') - 250 - StatusBar.currentHeight
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  main: {
    width: '100%',
    height: '100%'
  }
})
