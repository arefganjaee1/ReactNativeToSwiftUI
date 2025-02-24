import { StatusBar, StyleSheet } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Colors, Fonts, Metrics } from '../../Theme'
export default styles = StyleSheet.create({
  scrol: {
    flex: 1,
    ...Metrics.mediumHorizontalPadding
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },
  top: {
    ...Metrics.mediumHorizontalPadding,
    height: hp('50%') - StatusBar.currentHeight,
    width: '100%',
    marginTop: 30
  },
  mainContent: {
    marginTop: wp('2%'),
    alignItems: 'center'
  },
  logoImg: {
    width: 200,
    height: 49,
    marginTop: 20,
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
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingHorizontal: 10
  },
  noDeviceExist: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderTopColor: '#292929'
  },
  noDeviceText: {
    ...Fonts.text_13,
    color: Colors.light,
    marginTop: 10
  }
})
