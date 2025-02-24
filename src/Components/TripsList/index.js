import moment from 'moment-jalaali'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Error from '../../Components/Error/Error'
import Loading from '../../Components/Loading/Loading'
import { useCheckNetInfo } from '../../Hooks/useCheckNetInfo'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import { convertEnglishToPersianNumber } from './../../Helpers/numberConverter2'
import styles from './style'

const TripsList = ({
  tripsData,
  tripsLoading,
  tripsError,
  handleGetTripsReport
}) => {
  //============================State==========================
  //============================Constant==========================
  const { Calendar, Clock } = Images
  const { netInfo } = useCheckNetInfo()
  //============================Functions==========================

  const fetchData = () => {
    handleGetTripsReport()
  }
  const padZero = value => {
    return value < 10 ? `0${value}` : value
  }

  const handleTripTime = duration => {
    const minutes = (duration / (1000 * 60)).toFixed(0)
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      const persianHours = convertEnglishToPersianNumber(hours)
      console.log('persianHours', persianHours)
      const persianMinutes = convertEnglishToPersianNumber(remainingMinutes)
      return `${persianHours} ساعت ${persianMinutes} دقیقه`
    } else {
      const persianMinutes = convertEnglishToPersianNumber(minutes)
      return `${persianMinutes} دقیقه`
    }
  }

  const handleTime = endTime => {
    const time = new Date(endTime)
    let hours = time.getUTCHours() + 3
    let minutes = time.getUTCMinutes() + 30
    const seconds = time.getUTCSeconds()
    if (minutes >= 60) {
      minutes -= 60
      hours += 1
    }
    if (hours >= 24) {
      hours -= 24
    }
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}`
    return formattedTime
  }
  const handleDate = e => {
    const time = new Date(e)
    let hours = time.getUTCHours() + 3
    let minutes = time.getUTCMinutes() + 30
    if (minutes >= 60) {
      minutes -= 60
      hours += 1
    }
    let dayIncrement = 0
    if (hours >= 24) {
      hours -= 24
      dayIncrement = 1
    }
    const itemDate = moment(e).format('YYYY-MM-DD')
    const modifiedDate = moment(itemDate, 'YYYY-MM-DD')
      .add(dayIncrement, 'day') // Increment the day if necessary
      .format('jYYYY/jMM/jDD')
    return modifiedDate
  }

  const handleContent = () => {
    if (netInfo) {
      if (tripsError === '') {
        if (tripsLoading) {
          return <Loading color={Colors.light} />
        } else {
          if (tripsData) {
            return (
              <View style={styles.container}>
                <FlatList
                  initialNumToRender={6}
                  data={tripsData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 400
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                      <View style={styles.leftSection}>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>تاریخ و ساعت شروع</Text>
                        </View>
                        <View style={styles.rowIcons}>
                          <View style={styles.iconCover}>
                            <Calendar />
                          </View>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              handleTime(item.startTime)
                            )}
                          </Text>
                          <Text style={styles.text}>_</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              handleDate(item.startTime)
                            )}
                          </Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>تاریخ و ساعت پایان</Text>
                        </View>
                        <View style={styles.rowIcons}>
                          <View style={styles.iconCover}>
                            <Clock />
                          </View>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              handleTime(item.endTime)
                            )}
                          </Text>
                          <Text style={styles.text}>_</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              handleDate(item.endTime)
                            )}
                          </Text>
                        </View>
                        <View style={styles.rowText2}>
                          <Text style={styles.text2}>آدرس شروع: </Text>
                          <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>
                              {item.startAddress}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowText2}>
                          <Text style={styles.text2}>آدرس توقف: </Text>
                          <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>
                              {item.endAddress}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.rightSection}>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>نام دستگاه</Text>
                          <Text style={styles.text}>{item.deviceName}</Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>بالاترین سرعت</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              (item.maxSpeed * 1.852).toFixed(0)
                            )}{' '}
                            Km/h
                          </Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>مسافت طی شده</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              (item.distance / 1000).toFixed(2)
                            )}{' '}
                            Km
                          </Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>سرعت متوسط</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              (item.averageSpeed * 1.852).toFixed(2)
                            )}{' '}
                            Km/h
                          </Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>زمان حرکت</Text>
                          <Text style={styles.text}>
                            {handleTripTime(item.duration)}
                          </Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>مصرف سوخت</Text>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              Math.abs(item.spentFuel).toFixed(2)
                            )}{' '}
                            لیتر
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  onEndReachedThreshold={0.1}
                />
              </View>
            )
          } else {
            return (
              <>
                {/* <View>
                  <Text style={styles.text}>دیتایی برای نمایش وجود ندارد</Text>
                </View> */}
              </>
            )
          }
        }
      } else {
        return <Error FetchData={fetchData} />
      }
    } else {
      return <Error FetchData={fetchData} />
    }
  }
  return handleContent()
}

export default TripsList
