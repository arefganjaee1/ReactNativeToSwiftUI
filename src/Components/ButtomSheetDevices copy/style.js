import { StyleSheet } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    height: 118,
    width: '100%',
    marginTop: 15,
    backgroundColor: Colors.grayDrawer,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: Colors.light,
    ...Fonts.text_8,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  rowText: {
    flexDirection: 'row-reverse',
  },
  text: {
    ...Fonts.text_11,
    color: Colors.light,
    paddingBottom: 7,
  },
  rowIcons: {
    flexDirection: 'row',
  },
  iconCover: {
    height: 30,
    width: 30,
    backgroundColor: Colors.lightOrange,
    borderRadius: 15,
  },
  rowbtns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
  btn: {
    height: 18,
    width: 50,
    backgroundColor: Colors.orange,
    borderRadius: 100,
    ...StyleHelpers.center,
    marginRight: 10,
  },
  btnText: {
    ...Fonts.text_8,
    color: Colors.light,
  },
  statusBtn: {
    height: 18,
    width: 50,
    backgroundColor: Colors.lightGreen,
    borderRadius: 100,
    ...StyleHelpers.center,
    flexDirection: 'row',
  },
  statusBtnText: {
    ...Fonts.text_8,
    color: Colors.green,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginLeft: 3,
    backgroundColor: Colors.green,
  },
  detailText: {
    ...Fonts.text_11,
    color: Colors.gratText4,
    paddingRight: 20,
  },
  row2: {
    flexDirection: 'row-reverse',
    // justifyContent: 'space-between',
    paddingRight: 20,
  },
  address: {
    ...Fonts.text_10,
    color: '#B4B4B4',
  },
});
