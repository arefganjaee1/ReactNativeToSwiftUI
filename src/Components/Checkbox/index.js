import React from 'react'
import { TouchableOpacity } from 'react-native'
import Images from '../../Theme/Images'
import styles from './styles'

const Checkbox = ({ style, check, setCheck, handleNotificator, onToggle }) => {
  const { Check, Cheked } = Images
  const toggleCheckbox = () => {
    setCheck(!check)
    handleNotificator()
    onToggle(!check)
  }

  return (
    <TouchableOpacity
      style={[style, styles.checkedBox]}
      onPress={toggleCheckbox}
      activeOpacity={0.8}
    >
      {check ? <Cheked /> : <Check />}
    </TouchableOpacity>
  )
}

export default Checkbox
