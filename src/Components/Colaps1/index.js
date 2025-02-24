import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Images from '../../Theme/Images';
import styles from './styles';

const Colaps1 = ({ title, RightIcon, content, contentHeight }) => {
  const { ArrowDown, ArrowUp } = Images;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current;


  const toggleCollapse = () => {
    Animated.timing(translateY, {
      toValue: isCollapsed ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setIsCollapsed(!isCollapsed);
    });
  };

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [47, contentHeight],
          }),
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerContent}
        onPress={toggleCollapse}
      >
        <View style={styles.iconContainer}>
          {isCollapsed && <ArrowDown />}
          {!isCollapsed && <ArrowUp />}
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{title}</Text>
          <RightIcon />
        </View>
      </TouchableOpacity>

      {typeof content === 'function' ? content() : content}
    </Animated.View>
  );
};

export default Colaps1;
