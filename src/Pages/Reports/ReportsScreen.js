import moment from 'moment-jalaali'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useReportsApi } from '../../Api/useReportsApi'
import ButtonTab2 from '../../Components/ButtonTab2/ButtonTab2'
import DrawerMenu from '../../Components/DrawerMenu'
import GrowingView from '../../Components/GrowingView/GrowingView'
import Header2 from '../../Components/Header2/Header2'
import SelectDevice from '../../Components/SelectDevice/SelectDevice'
import Spacer from '../../Components/Spacer/Spacer'
import StopsList from '../../Components/StopsList'
import TripsList from '../../Components/TripsList'
import { convertEnglishToPersianNumber } from '../../Helpers/numberConverter2'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import CalendarModal from './CalendarModal/CalendarModal'
import styles from './ReportsStyles'

const ReportsScreen = ({ navigation }) => {
  const currentDate = moment().format('jYYYY/jMM/jDD')
  //============================STATE==========================
  const [CalendarVisible, setCalendarVisible] = useState(false)
  const [startDate, setStartDate] = useState(currentDate)
  const [endDate, setEndDate] = useState(currentDate)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [Tab, setTab] = useState(3)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [animation, setAnimation] = useState(false)
  //============================Constants==========================
  const { WholeDistance, FuelConsuming, MovingTime, Calendar2 } = Images
  const {
    handleGetTripsReport,
    handleGetStopsReport,
    handleGetSummaryReport,
    summaryData,
    summaryLoading,
    summaryError,
    tripsData,
    tripsLoading,
    tripsError,
    showEmpty,
    stopsData,
    stopsLoading,
    stopsError,
    setShowEmpty
  } = useReportsApi()
  const toast = useToast()
  //============================Functions==========================
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const changeTab = input => {
    setTab(input)
    setShowEmpty(false)
  }
  const handleCalendarOpen = () => {
    setCalendarVisible(true)
    setStartDate(null)
    setEndDate(null)
  }
  const convertStartDateFormat = inputDate => {
    const parsedDate = moment(inputDate, 'jYYYY/jMM/jDD')
    const dayBefore = parsedDate.subtract(1, 'day')
    const utcTime = moment.utc([
      dayBefore.year(),
      dayBefore.month(),
      dayBefore.date(),
      20,
      30,
      0,
      0
    ])
    const formattedDate = utcTime.toISOString()
    return formattedDate
  }
  const convertEndDateFormat = inputDate => {
    const parsedDate = moment(inputDate, 'jYYYY/jMM/jDD')
    const startOfDayLocal = parsedDate.startOf('day')
    const utcMidnight = moment.utc([
      startOfDayLocal.year(),
      startOfDayLocal.month(),
      startOfDayLocal.date(),
      20,
      30,
      0,
      0
    ])
    const formattedDate = utcMidnight.toISOString()
    return formattedDate
  }
  const handleGetReport = () => {
    if (startDate && endDate) {
      const startJalali = moment(startDate, 'jYYYY/jMM/jDD')
      const endJalali = moment(endDate, 'jYYYY/jMM/jDD')
      const differenceInDays = endJalali.diff(startJalali, 'days')
      if (differenceInDays > 3) {
        toast.show('بازه زمانی انتخاب شده بیش از حد مجاز است', {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 100,
          animationType: 'zoom-in'
        })
      } else {
        let deviceId = selectedDevice?.id
        let fromDate = convertStartDateFormat(startDate)
        let toDate = convertEndDateFormat(endDate)
        console.log('fromDate', fromDate)
        console.log('toDate', toDate)
        if (Tab === 3) {
          handleGetTripsReport(deviceId, fromDate, toDate)
        } else if (Tab === 1) {
          setAnimation(true)
          handleGetSummaryReport(deviceId, fromDate, toDate)
        } else if (Tab === 2) {
          handleGetStopsReport(deviceId, fromDate, toDate)
        }
      }
    } else {
      toast.show('لطفا تاریخ مدنظر را انتخاب کنید', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 100,
        animationType: 'zoom-in'
      })
    }
  }

  // useEffect(() => {
  //   if (Tab === 1) {
  //     handleGetReport()
  //   }
  // }, [Tab])

  useEffect(() => {
    totalDuration()
    totalSpentFuel()
    totalDistance()
  }, [tripsData])
  const totalDuration = () => {
    if (!tripsData || tripsData.length === 0) return 0
    return tripsData
      .map(item => item.duration / 60000)
      .reduce((total, duration) => total + duration, 0)
      .toFixed(2)
  }

  const totalSpentFuel = () => {
    if (!tripsData || tripsData.length === 0) return 0
    const totalSpentFuel = tripsData
      .map(item => item.spentFuel)
      .reduce((total, spentFuel) => total + spentFuel, 0)
    return Math.abs(totalSpentFuel.toFixed(2))
  }

  const totalDistance = () => {
    if (!tripsData || tripsData.length === 0) return 0
    return tripsData
      .map(item => item.distance / 1000)
      .reduce((total, distance) => total + distance, 0)
      .toFixed(2)
  }
  const handleTripsFooter = () => {
    return (
      <>
        <View style={styles.footerBorder}></View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <MovingTime />
            <Text style={styles.footerText}> زمان حرکت</Text>
            <Text style={styles.footerText2}>
              {' '}
              {convertEnglishToPersianNumber(totalDuration())} دقیقه
            </Text>
          </View>
          <View style={styles.footerItem}>
            <FuelConsuming />
            <Text style={styles.footerText}>مصرف سوخت</Text>
            <Text style={styles.footerText2}>
              {convertEnglishToPersianNumber(totalSpentFuel())} لیتر
            </Text>
          </View>
          <View style={styles.footerItem}>
            <WholeDistance />
            <Text style={styles.footerText}>مسافت کل</Text>
            <Text style={styles.footerText2}>
              {convertEnglishToPersianNumber(totalDistance())} کیلومتر{' '}
            </Text>
          </View>
        </View>
      </>
    )
  }
  useEffect(() => {
    GrowingTotalDuration()
    GrowingTotalSpentFuel()
    GrowingTotalDistance()
  }, [summaryData])
  const GrowingTotalDuration = () => {
    if (!summaryData || summaryData.length === 0) return 0
    return summaryData
      .map(item => item.engineHours / 60000)
      .reduce((total, engineHours) => total + engineHours, 0)
      .toFixed(2)
  }

  const GrowingTotalSpentFuel = () => {
    if (!summaryData || summaryData.length === 0) return 0
    const totalSpentFuel = summaryData
      .map(item => item.spentFuel)
      .reduce((total, spentFuel) => total + spentFuel, 0)
    return Math.abs(totalSpentFuel.toFixed(2))
  }

  const GrowingTotalDistance = () => {
    if (!summaryData || summaryData.length === 0) return 0
    return summaryData
      .map(item => item.distance / 1000)
      .reduce((total, distance) => total + distance, 0)
      .toFixed(2)
  }
  const handleGrowingFooter = () => {
    return (
      <>
        <View style={styles.footerBorder}></View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <MovingTime />
            <Text style={styles.footerText}>زمان کارکرد موتور</Text>
            <Text style={styles.footerText2}>
              {GrowingTotalDuration
                ? convertEnglishToPersianNumber(GrowingTotalDuration())
                : '۰'}{' '}
              دقیقه
            </Text>
          </View>
          <View style={styles.footerItem}>
            <FuelConsuming />
            <Text style={styles.footerText}>مصرف سوخت</Text>
            <Text style={styles.footerText2}>
              {GrowingTotalSpentFuel
                ? convertEnglishToPersianNumber(GrowingTotalSpentFuel())
                : '۰'}{' '}
              لیتر
            </Text>
          </View>
          <View style={styles.footerItem}>
            <WholeDistance />
            <Text style={styles.footerText}>مسافت کل</Text>
            <Text style={styles.footerText2}>
              {GrowingTotalDistance
                ? convertEnglishToPersianNumber(GrowingTotalDistance())
                : '۰'}{' '}
              کیلومتر
            </Text>
          </View>
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <CalendarModal
        isVisible={CalendarVisible}
        setVisible={setCalendarVisible}
        {...{ startDate, setStartDate, endDate, setEndDate }}
      />
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />
      <View style={styles.filterSection}>
        <SelectDevice {...{ selectedDevice, setSelectedDevice }} />
        <TouchableOpacity style={styles.button} onPress={handleCalendarOpen}>
          <Calendar2 />
          <Text style={styles.buttonText}>
            {startDate
              ? `ازتاریخ ${convertEnglishToPersianNumber(
                  startDate
                )} تا تاریخ ${convertEnglishToPersianNumber(endDate)} `
              : `ازتاریخ ${convertEnglishToPersianNumber(
                  currentDate
                )} تا تاریخ ${convertEnglishToPersianNumber(currentDate)} `}
          </Text>
        </TouchableOpacity>

        <ButtonTab2
          {...{
            title1: 'خلاصه عملکرد',
            title2: 'گزارش توقف ها',
            title3: 'گزارش سفر ها'
          }}
          onTabbarPress={changeTab}
          onReportPress={handleGetReport}
        />

        <Spacer
          {...{ style: { marginTop: 20, backgroundColor: Colors.grayBorder } }}
        />
      </View>
      {showEmpty && (
        <View
          style={{
            paddingTop: 30,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.emptyText}>دیتایی برای نمایش وجود ندارد</Text>
        </View>
      )}

      {Tab === 1 && (
        <GrowingView
          {...{
            handleGetSummaryReport,
            summaryData,
            summaryLoading,
            summaryError,
            startDate,
            animation
          }}
        />
      )}
      {Tab === 2 && (
        <StopsList
          {...{
            handleGetStopsReport,
            stopsData,
            stopsLoading,
            stopsError
          }}
        />
      )}
      {Tab === 3 && (
        <TripsList
          {...{
            tripsData,
            tripsLoading,
            tripsError,
            handleGetTripsReport
          }}
        />
      )}
      {Tab === 1 && handleGrowingFooter()}
      {Tab === 3 && handleTripsFooter()}
    </SafeAreaView>
  )
}
export default ReportsScreen
