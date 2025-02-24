import React from 'react';
import {View} from 'react-native';
const Spacer = ({style, color = '#707070', width = '100%', height = 1}) => {
  return (
    <View
      style={[
        {
          height: height,
          backgroundColor: color,
          width: width,
          alignSelf: 'center',
        },
        style,
      ]}
    />
  );
};
export default Spacer;
