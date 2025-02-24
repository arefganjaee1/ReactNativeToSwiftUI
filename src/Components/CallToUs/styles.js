import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Fonts } from '../../Theme'

export default styles = StyleSheet.create({
  botton: {
    height: 61,
    width: '100%',
    marginTop: hp('3%')
  },
  call: {
    height: '100%',
    width: 45,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A'
  },
  showCall: {
    flexDirection: 'row',
    height: '100%',
    width: 170,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#1A1A1A'
  },
  number: {
    ...Fonts.text_16,
    color: '#8C8C8C',
    paddingRight: 10
  }
})
