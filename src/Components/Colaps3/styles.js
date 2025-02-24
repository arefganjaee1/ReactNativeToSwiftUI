import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { StyleHelpers, Fonts, Colors, Metrics } from '../../Theme';

const DrawerMenuWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const heightSize = height - StatusBar.currentHeight;
const statusBar = StatusBar.currentHeight;
export default styles = StyleSheet.create({
  iconContainer: {
    width: '15%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: Colors.grayDrawer,
    borderRadius: 23,
    overflow: 'hidden',
    marginTop: 15,
  },
  rightContainer: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerContent: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  title: {
    ...Fonts.text_12,
    color: Colors.grayText2,
    textAlign: 'right',
    paddingRight: 12,
  },
});
