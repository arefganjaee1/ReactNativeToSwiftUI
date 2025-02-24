import { StatusBar, StyleSheet } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Colors, Fonts, Metrics } from '../../Theme'
export default styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: Colors.dark
  },
  container: {
    flex: 1
  },
  top: {
    ...Metrics.mediumHorizontalPadding,
    height: hp('50%') - StatusBar.currentHeight,
    width: '100%',
    marginTop: 30
  },
  mainContent: {
    marginTop: wp('2%')
  },
  logoImg: {
    width: 200,
    height: 55,
    marginTop: 60,
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
    marginTop: 20
  },
  text: {
    color: Colors.grayText2,
    ...Fonts.text_12
  }
})
