import { AppNavigator } from '../../Navigation/AppNavigator';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';

const RootScreen = gestureHandlerRootHOC(() => {
  return (
    <React.Fragment>
      <AppNavigator />
    </React.Fragment>
  );
});

export default RootScreen;
