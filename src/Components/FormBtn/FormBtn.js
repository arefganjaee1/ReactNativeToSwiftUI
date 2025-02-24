import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../Theme'
import Indicator from '../Indicator/Indicator'
import styles from './styles'

const FormBtn = ({
  handleSubmit,
  title,
  disabled,
  loading,
  style,
  titleStyle,
  loadingSize
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={!disabled || loading}
      onPress={handleSubmit}
      style={[
        styles.BtnContainer,
        !disabled && { backgroundColor: Colors.disableButton },
        style
      ]}
    >
      {loading ? (
        <Indicator color={'white'} size={loadingSize || 20} />
      ) : (
        <Text
          style={[
            styles.textBtn,
            !disabled && { color: Colors.light },
            titleStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default FormBtn
