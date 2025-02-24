import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20
  },
  card: {
    height: 150,
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: Colors.grayDrawer,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grayBorder
  },
  leftSection: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightSection: {
    height: '100%',
    width: '50%',
    paddingTop: 13,
    paddingHorizontal: 10
  },
  iconCover: {
    height: '100%',
    width: '10%',
    paddingTop: 25
  },
  rowText: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  text: {
    ...Fonts.text_11,
    color: Colors.light,
    paddingBottom: 10
  },
  rowIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    width: '100%'
  },
  iconBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtn: {
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 7,
    backgroundColor: Colors.orange
  },
  btnText: {
    ...Fonts.text_10,
    color: Colors.whiteText
  }
})
