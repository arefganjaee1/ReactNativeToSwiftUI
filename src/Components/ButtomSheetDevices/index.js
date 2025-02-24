import moment from 'moment-jalaali'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useAddressApi } from '../../Api/useAddressApi'
import { convertEnglishToPersianNumber } from '../../Helpers/numberConverter2'
import { Colors } from '../../Theme'
import styles from './style'

const ButtomSheetDevices = ({ devicesData, positionData, socketData }) => {
  //============================State===============================
  const [coordinates, setCoordinates] = useState([
    51.356616419024135, 35.74441960479204
  ])
  const [lastUpdate, setLastUpdate] = useState('')
  const [addressData, setAddressData] = useState('')
  const [ignition, setIgnition] = useState('')
  const [addressLoading, setAddressLoading] = useState(false)
  //============================Constant============================
  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { handleGetAddress } = useAddressApi()
  //============================Functions============================
  useEffect(() => {
    if (Position) {
      setCoordinates([Position?.longitude, Position?.latitude])
      setIgnition(Position?.attributes?.ignition)
      setLastUpdate(Position?.fixTime)
    }
  }, [Position])

  useEffect(() => {
    if (
      socketData?.positions?.length > 0 &&
      socketData?.positions?.[0]?.deviceId === Device?.id
    ) {
      setCoordinates([
        socketData?.positions?.[0]?.longitude,
        socketData?.positions?.[0]?.latitude
      ])
      setIgnition(socketData?.positions?.[0]?.attributes?.ignition)
      setLastUpdate(socketData?.positions?.[0]?.fixTime)
    }
  }, [socketData])

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

  const handleAddress = () => {
    setAddressLoading(true)
    let latitude = coordinates[1]
    let longitude = coordinates[0]
    handleGetAddress(latitude, longitude)
      .then(response => {
        setAddressData(response.data)
        setAddressLoading(false)
      })
      .catch(error => {
        console.log('Error fetching address:', error)
        setAddressLoading(false)
      })
  }
  //============================View============================
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.row, { marginTop: 20 }]}>
          <View style={styles.rowText}>
            <Text style={styles.text}>نام دستگاه:</Text>
            {Device?.name ? (
              <Text style={styles.detailText}>{Device?.name}</Text>
            ) : (
              <Text style={styles.detailText}>نام یافت نشد</Text>
            )}
          </View>
          {Position?.attributes?.ignition && (
            <View style={styles.statusBtn}>
              <Text style={styles.statusBtnText}>روشن</Text>
              <View style={styles.dot}></View>
            </View>
          )}
          {!Position?.attributes?.ignition && (
            <View style={[styles.statusBtn, { backgroundColor: Colors.red }]}>
              <Text style={[styles.statusBtnText, { color: Colors.whiteText }]}>
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
            <Text style={styles.text}>تاریخ آخرین به روزرسانی:</Text>
            <Text style={styles.detailText}>
              {lastUpdate
                ? `${convertEnglishToPersianNumber(
                    handleTime(lastUpdate)
                  )} ${convertEnglishToPersianNumber(handleDate(lastUpdate))}`
                : 'تاریخی یافت نشد'}
            </Text>
          </View>
        </View>
        <View style={[styles.row2]}>
          <View style={styles.rowText}>
            <Text style={styles.text}>آدرس : </Text>
          </View>
          {addressData ? (
            <Text style={styles.address}>{addressData}</Text>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleAddress()}
            >
              {addressLoading ? (
                <ActivityIndicator color={'#ffff'} size={10} />
              ) : (
                <Text style={styles.btnText}>نمایش</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default ButtomSheetDevices
