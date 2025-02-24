import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20
  },
  transferOfOwnershipItem: {
    paddingVertical: 20,
    width: '100%',
    backgroundColor: Colors.ownerShip,
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    justifyContent: 'space-between'
  },
  transferOfOwnershipItemText: {
    ...Fonts.text_12,
    color: Colors.light,
    lineHeight: 20
  },
  transferOfOwnershipText: {
    ...Fonts.text_11,
    color: Colors.light,
    marginTop: 10
  },
  rowBtn: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  submitBtn: {
    width: 60,
    height: 25,
    backgroundColor: Colors.green
  },
  cancelBtn: {
    width: 60,
    height: 25,
    backgroundColor: Colors.red,
    marginRight: 10
  },
  empty: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
