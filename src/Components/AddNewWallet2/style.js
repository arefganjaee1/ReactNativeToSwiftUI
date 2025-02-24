import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 5,
    width: '100%',
    backgroundColor: Colors.dark,
  },
  profileText: {
    color: Colors.whiteText,
    ...Fonts.profileText,
    textAlign: 'right',
  },
  titles: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
  },
  inputs: {
    flexDirection: 'row',
    width: '75%',
    paddingLeft: 10,
    paddingRight: 15,
  },
  textInput: {
    minHeight: 100,
    width: '100%',
    color: Colors.whiteText,
    textAlign: 'left',
    paddingVertical: 2,
    borderColor: Colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  connect: {
    height: '100%',
    width: 55,
    justifyContent: 'center',
    marginLeft: 10,
  },
  connectText: {
    color: Colors.orange,
    ...Fonts.profileText,
  },
  btn: {
    marginTop: 30,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
  },
});
