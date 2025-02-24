import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StatusBar,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styles from './SurveyStyles';
import Images from '../../Theme/Images';
import CONSTANTS from '../../Values/Constants';
import DrawerMenu from '../../Components/DrawerMenu';
import { Colors } from '../../Theme';

const SurveyScreen = ({ navigation }) => {
  const { BookmarkIcon, MapBackground } = Images;
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [110, 300], []);

  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.dark);
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('light-content');
  }, []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log('drawer opened');
  };

  // renders
  return (
    <ImageBackground source={MapBackground} style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {/* Drawer content */}
        <Text style={{ color: Colors.darkText }}>Drawer Content</Text>
      </DrawerMenu>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menue}>
        <BookmarkIcon />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={styles.content}></View>
        </View>
      </BottomSheet>
      <View style={styles.buttonContainer}>
        <View style={styles.button}></View>
        <View style={styles.button}></View>
        <View style={styles.button}></View>
        <View style={styles.button}></View>
      </View>
    </ImageBackground>
  );
};

export default SurveyScreen;
