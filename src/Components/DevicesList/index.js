import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../Theme/Images'
import CONSTANTS from '../../Values/Constants'
import { convertEnglishToPersianNumber } from './../../Helpers/numberConverter'
import styles from './style'

const DevicesList = ({
  navigation,
  Devices,
  refreshDevices,
  setTrasferDeviceVisible,
  setTransferDeviceId
}) => {
  //============================State==========================
  const [isFetching, setIsFetching] = useState(false)
  //============================Constant==========================
  const { MiniMap, Car, Motor2, Delete, Edit, CarIcon } = Images
  const { EDIT_DEVICE_SCREEN } = CONSTANTS.Routes
  //============================Functions==========================
  const handleOnRefresh = () => {
    setIsFetching(true)
    refreshDevices()
    setTimeout(() => {
      setIsFetching(false)
    }, 400)
  }
  const handleEditPress = item => {
    navigation.navigate(EDIT_DEVICE_SCREEN, { item })
  }
  const handleTrasferDevice = id => {
    setTrasferDeviceVisible(true)
    setTransferDeviceId(id)
  }
  const handlePress = item => {
    console.log('item>>>', item?.data)
  }
  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={6}
        data={Devices}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10
        }}
        renderItem={({ item }) => (
          <View style={styles.card} key={item?.id}>
            <View style={styles.leftSection}>
              {item?.category === 'motorcycle' ? (
                <Motor2
                  width={60}
                  height={60}
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 20 20'
                />
              ) : item?.category === 'car' ? (
                <Car
                  width={60}
                  height={60}
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 20 20'
                />
              ) : (
                <Car
                  width={60}
                  height={60}
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 20 20'
                />
              )}
            </View>
            <View style={styles.rightSection}>
              <View style={styles.rowText}>
                <Text style={styles.text}>نام دستگاه</Text>
                <Text style={styles.text}>{item?.name}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>شماره سریال</Text>
                <Text style={styles.text}>
                  {item?.contact
                    ? convertEnglishToPersianNumber(item?.contact)
                    : 'یافت نشد'}
                </Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.text}>مدل</Text>
                <Text style={styles.text}>{item?.model}</Text>
              </View>
              <View style={styles.rowIcons}>
                <TouchableOpacity
                  onPress={() => handleEditPress(item)}
                  style={styles.iconBtn}
                >
                  <Edit />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTrasferDevice(item?.id)}
                  style={styles.textBtn}
                >
                  <Text style={styles.btnText}>انتقال دستگاه</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        onEndReachedThreshold={0.1}
        onRefresh={handleOnRefresh}
        refreshing={isFetching}
      />
    </View>
  )
}

export default DevicesList
