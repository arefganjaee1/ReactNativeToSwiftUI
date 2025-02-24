import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../Theme'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const containerHeight = height
export default StyleSheet.create({
  scrol: {
    width: '100%',
    paddingBottom: 150
  },
  container: {
    height: containerHeight,
    width: '100%',
    backgroundColor: Colors.dark
  },
  menue: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logoImg: {
    width: 200,
    height: 49,
    marginTop: 30,
    alignSelf: 'center'
  },
  dropDown: {
    width: '100%',
    paddingHorizontal: 20
  },
  Vehicle: {
    width: '100%',
    height: 258,
    alignItems: 'center'
  },
  items: {
    width: '100%',
    paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  item: {
    paddingVertical: 1,
    width: '23%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  top: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  itemText: {
    ...Fonts.text_11,
    color: Colors.light
  },
  map: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  }
})
