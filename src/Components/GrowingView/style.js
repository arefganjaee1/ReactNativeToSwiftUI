import { StyleSheet } from 'react-native'
import { Fonts } from '../../Theme'

export default StyleSheet.create({
  main: {
    height: 340,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 110
  },
  container: {
    height: 200,
    width: '90%',
    backgroundColor: '#1B1B1B',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center'
  },
  stickyContainer: {
    width: '90%',
    height: '80%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#323232',
    paddingHorizontal: 10
  },
  growingView: {
    height: 13,
    backgroundColor: '#F04E29',
    overflow: 'hidden',
    marginBottom: 12,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  movingView: {
    width: 100,
    height: 100,
    backgroundColor: '#1B1B1B'
  },
  top: {
    height: '60%',
    width: '100%',
    position: 'relative'
  },
  bottom: {
    height: '40%',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1B1B1B',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 26,
    zIndex: 999,
    ...Fonts.text_7,
    alignSelf: 'center'
  },
  text2: {
    color: 'black',
    position: 'absolute',
    top: 35,
    left: 90,
    zIndex: 999,
    ...Fonts.text_7,
    alignSelf: 'center'
  },
  title: {
    width: '90%',
    height: '10%',
    justifyContent: 'flex-end'
  },
  dateText: {
    color: '#8D8D8D',
    fontSize: 10,
    alignSelf: 'flex-start'
  }
})
