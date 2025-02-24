import moment from 'moment-jalaali'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useAddressApi } from '../../Api/useAddressApi'
import { Colors } from '../../Theme'
import styles from './style'

const ButtomSheetDevices = ({ devicesData, positionData, socketData }) => {
  //============================State===============================
  const [mergedArray, setMergedArray] = useState([])
  const [socketPositionsData, setSocketPositionsData] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null)
  //============================Constant============================
  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { handleGetAddress } = useAddressApi()
  //============================Functions============================
  useEffect(() => {
    if (
      socketData?.positions?.length > 0 &&
      socketData?.positions?.[0]?.deviceId === selectedDevice?.id
    ) {
      setSocketPositionsData(socketData?.positions)
    }
  }, [socketData])
  useEffect(() => {
    if (devicesData && positionData) {
      let mergedArray = devicesData.map(device => {
        const matchingPosition = positionData.find(
          pos => pos.id === device.positionId
        )
        return { ...device, ...matchingPosition, addressLoading: false }
      })
      setMergedArray(mergedArray)
    }
  }, [devicesData, positionData])

  const handleTime = e => {
    const itemTime = moment(e).format('HH:mm:ss')
    const modifiedTime = moment(itemTime, 'HH:mm:ss').format('HH:mm:ss')
    return modifiedTime
  }

  const handleDate = e => {
    const itemDate = moment(e).format('YYYY-MM-DD')
    const modifiedDate = moment(itemDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')
    return modifiedDate
  }

  const handleAddress = item => {
    const updatedMergedArray = mergedArray.map(prevItem =>
      prevItem.id === item.id ? { ...prevItem, addressLoading: true } : prevItem
    )
    setMergedArray(updatedMergedArray)

    let latitude = item.latitude
    let longitude = item.longitude
    handleGetAddress(latitude, longitude)
      .then(response => {
        const updatedMergedArray = mergedArray.map(prevItem =>
          prevItem.id === item.id
            ? {
                ...prevItem,
                addressData: response.data,
                addressLoading: false
              }
            : prevItem
        )
        setMergedArray(updatedMergedArray)
      })
      .catch(error => {
        console.log('Error fetching address:', error)
        const updatedMergedArray = mergedArray.map(prevItem =>
          prevItem.id === item.id
            ? { ...prevItem, addressLoading: false }
            : prevItem
        )
        setMergedArray(updatedMergedArray)
      })
  }
  //============================View============================
  return (
    <View style={styles.container}>
      {mergedArray?.map(item => (
        <View style={styles.card} key={item.id}>
          <View style={[styles.row, { marginTop: 20 }]}>
            <View style={styles.rowText}>
              <Text style={styles.text}>نام دستگاه:</Text>
              <Text style={styles.detailText}>{item.name}</Text>
            </View>
            {mergedArray?.attributes?.ignition && (
              <View style={styles.statusBtn}>
                <Text style={styles.statusBtnText}>روشن</Text>
                <View style={styles.dot}></View>
              </View>
            )}
            {!mergedArray?.attributes?.ignition && (
              <View style={[styles.statusBtn, { backgroundColor: Colors.red }]}>
                <Text
                  style={[styles.statusBtnText, { color: Colors.whiteText }]}
                >
                  خاموش
                </Text>
                <View
                  style={[styles.dot, { backgroundColor: Colors.whiteText }]}
                ></View>
              </View>
            )}
          </View>
          <View style={[styles.row]}>
            <View style={styles.rowText}>
              <Text style={styles.text}>تاریخ اخرین به روزرسانی:</Text>
              <Text style={styles.detailText}>
                {item.lastUpdate
                  ? `${handleTime(item.lastUpdate)} ${handleDate(
                      item.lastUpdate
                    )}`
                  : 'تاریخی یافت نشد'}
              </Text>
            </View>
          </View>
          <View style={[styles.row2]}>
            <View style={styles.rowText}>
              <Text style={styles.text}>آدرس : </Text>
            </View>
            {item.addressData ? (
              <Text style={styles.address}>{item.addressData}</Text>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleAddress(item)}
              >
                {item.addressLoading ? (
                  <ActivityIndicator color={'#ffff'} size={10} />
                ) : (
                  <Text style={styles.btnText}>نمایش</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}

export default ButtomSheetDevices
