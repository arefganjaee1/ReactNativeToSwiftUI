import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Images from '../../Theme/Images';

const MenueItem = ({
  navigation,
  style,
  id,
  title,
  onMenueItemPress,
  titleStyle,
}) => {
  const { Union, Notifs, Charge, Sms, Car, Commands, Reports, Help, Exite } =
    Images;

  const onItemPress = () => {
    onMenueItemPress();
  };
  return (
    <TouchableOpacity onPress={onItemPress} style={[styles.container, style]}>
      <View style={styles.title}>
        <Text style={[styles.textTitle, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.right}>
        {id == '1' && <Union style={styles.Icon} />}
        {id == '2' && <Notifs style={styles.Icon} />}
        {id == '3' && <Charge style={styles.Icon} />}
        {id == '4' && <Sms style={styles.Icon} />}
        {id == '5' && <Car style={styles.Icon} />}
        {id == '6' && <Commands style={styles.Icon} />}
        {id == '7' && <Reports style={styles.Icon} />}
        {id == '8' && <Help style={styles.Icon} />}
        {id == '9' && <Exite style={styles.Icon} />}
      </View>
    </TouchableOpacity>
  );
};

export default MenueItem;
