import moment from 'moment-jalaali'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Error from '../../Components/Error/Error'
import Loading from '../../Components/Loading/Loading'
import { useCheckNetInfo } from '../../Hooks/useCheckNetInfo'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import { convertEnglishToPersianNumber } from './../../Helpers/numberConverter'
import styles from './style'

const StopsList = ({
  handleGetStopsReport,
  stopsData,
  stopsLoading,
  stopsError
}) => {
  //============================State==========================

  //============================Constant==========================
  const { Calendar, Clock } = Images
  const { netInfo } = useCheckNetInfo()
  //============================Functions==========================
  const fetchData = () => {
    handleGetStopsReport()
  }
  const padZero = value => {
    return value < 10 ? `0${value}` : value
  }
  const handleStopTime = endTime => {
    const time = new Date(endTime)
    let hours = time.getUTCHours()
    let minutes = time.getUTCMinutes()
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
    const modifiedDate = moment(e, 'YYYY-MM-DD')
      .add(dayIncrement, 'day')
      .format('jYYYY/jMM/jDD')
    return modifiedDate
  }

  const handleContent = () => {
    if (netInfo) {
      if (stopsError === '') {
        if (stopsLoading) {
          return <Loading color={Colors.light} />
        } else {
          if (stopsData) {
            return (
              <View style={styles.container}>
                <FlatList
                  initialNumToRender={6}
                  data={stopsData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 350
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                      <View style={styles.leftSection}>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>تاریخ و ساعت شروع :</Text>
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
                          <Text style={styles.text}>مدت زمان توقف :</Text>
                        </View>
                        <View style={styles.rowIcons}>
                          <View style={styles.iconCover}>
                            <Clock />
                          </View>
                          <Text style={styles.text}>
                            {convertEnglishToPersianNumber(
                              handleStopTime(item.duration)
                            )}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.rightSection}>
                        <View style={styles.rowText}>
                          <Text style={styles.text}>تاریخ و ساعت پایان :</Text>
                        </View>
                        <View style={styles.rowIcons}>
                          <View style={styles.iconCover}>
                            <Calendar />
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
                        <View style={styles.rowText}>
                          <Text style={styles.text}>آدرس توقف :</Text>
                        </View>
                        <View style={styles.rowText}>
                          <Text style={[styles.text, { paddingRight: 10 }]}>
                            {item.address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  onEndReachedThreshold={0.1}
                  // onRefresh={handleOnRefresh}
                  // refreshing={isFetching}
                />
              </View>
            )
          } else {
            return (
              <>
                <View>
                  {/* <Text style={styles.text}>دیتایی برای نمایش وجود ندارد</Text> */}
                </View>
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

export default StopsList
