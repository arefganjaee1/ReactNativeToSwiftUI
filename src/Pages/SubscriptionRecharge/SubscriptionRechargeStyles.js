import { StatusBar, StyleSheet } from 'react-native'
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
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_20
  },
  circularContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyCharge: {
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 15,
    padding: 20
  },
  planContainer: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: Colors.orange,
    borderRadius: 15,
    padding: 12,
    marginTop: 30
  },
  planTitle: {
    color: Colors.light,
    alignSelf: 'center',
    ...Fonts.text_15
  },
  spacer: {
    backgroundColor: Colors.light,
    marginVertical: 5
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buyButton: {
    padding: 3
  },
  customText: {
    ...Fonts.text_27,
    color: Colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -120, // Adjust to vertically center the text
    fontFamily: 'IRANYekanMobileRegular'
  },
  circularStyle: {
    ...Fonts.text_27,
    color: Colors.light,
    fontWeight: 'bold',
    marginTop: 20
  }
})
