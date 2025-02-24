import { StatusBar, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
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

  rowButtons: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    height: '100%',
    width: wp('40%'),
    borderRadius: 10,
    backgroundColor: Colors.gray
  },
  callToUsButton: {
    height: 90,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: Colors.gray
  },
  buttonTopSection: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBottomSection: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 17
  },
  btnText: {
    ...Fonts.text_15,
    color: Colors.grayText2,
    fontWeight: '500',
    paddingTop: 5
  }
})
