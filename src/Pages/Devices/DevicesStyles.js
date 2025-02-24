import { StatusBar, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors, Fonts } from '../../Theme'
export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark,
    marginTop: StatusBar.currentHeight
  },
  searchRow: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  plusBtn: {
    flexDirection: 'row',
    height: 35,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    ...Fonts.text_10,
    color: Colors.light,
    marginRight: 10
  },
  text: {
    ...Fonts.text_19,
    color: Colors.orange,
    textAlign: 'center',
    marginTop: 100
  },
  list: {
    maxHeight: hp('55%'),
    width: '100%'
  },
  transferOfOwnershipText: {
    ...Fonts.text_13,
    color: Colors.whiteText,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 10
  },
  transferOfOwnership: {
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 20
  }
})
