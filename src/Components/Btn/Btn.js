import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Indicator from '../Indicator/Indicator';
import styles from './styles';
import { Colors } from '../../Theme';

const Btn = ({ handleSubmit, title, disabled, loading, style, Btnstyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      disabled={disabled || loading}
      onPress={handleSubmit}
      style={[
        styles.BtnContainer,
        style,
        disabled && { backgroundColor: Colors.orange },
      ]}
    >
      {loading ? (
        <Indicator color={Colors.darkText} />
      ) : (
        <Text style={[styles.textBtn, Btnstyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Btn;
