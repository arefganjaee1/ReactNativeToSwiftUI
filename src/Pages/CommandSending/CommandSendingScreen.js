import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useCommandsApi } from '../../Api/useCommandsApi'
import ButtonTab from '../../Components/ButtonTab/ButtonTab'
import Colaps from '../../Components/Colaps'
import DrawerMenu from '../../Components/DrawerMenu'
import FormBtn from '../../Components/FormBtn/FormBtn'
import HandleSlider2 from '../../Components/HandleSlider2/HandleSlider2'
import Header2 from '../../Components/Header2/Header2'
import SelectDevice from '../../Components/SelectDevice/SelectDevice'
import { Colors } from '../../Theme'
import Images from '../../Theme/Images'
import styles from './CommandSendingStyles'
import ControlSwitchModal from './ControlSwitchModal/ControlSwitchModal'
import SpeedAllertModal from './SpeedAllertModal/SpeedAllertModal'

const CommandSendingScreen = ({ navigation }) => {
  //============================STATE==========================
  const [ControlSwitchVisible, setControlSwitchVisible] = useState(false)
  const [speedAllertVisible, setSpeedAllertVisible] = useState(false)
  const [Tab, setTab] = useState(1)
  const [Tab2, setTab2] = useState(null)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [sliderBalanceValue, setSliderBalanceValue] = useState(70)
  const [relay, setRelay] = useState()
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [sliderValue, setSliderValue] = useState(90)
  const [openSection, setOpenSection] = useState(null)

  //============================Constants==========================
  const loading = false
  const isValid = true
  const errors = false
  const {
    handleSendCommand,
    sendCommandData,
    sendCommandLoading,
    sendCommandError
  } = useCommandsApi()
  const { NoDeviceSelected } = Images
  //============================Functions==========================
  const toggleSection = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section))
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }
  const RelayConnect = () => {
    let data = JSON.stringify({
      deviceId: selectedDevice?.id,
      description: 'CT11-RELAY-CONNECT',
      type: 'custom',
      attributes: { data: 'setdigout 0' }
    })
    handleSendCommand(data)
  }
  const RelayDisconnect = () => {
    let data = JSON.stringify({
      deviceId: selectedDevice?.id,
      description: 'CT11-RELAY-DISCONNECT',
      type: 'custom',
      attributes: { data: 'setdigout 1 6000 20' }
    })
    handleSendCommand(data)
  }
  const CrashLow = () => {
    let data = JSON.stringify({
      deviceId: selectedDevice?.id,
      description: 'CT11-CRASH-LOW',
      type: 'custom',
      attributes: { data: 'setparam 11401:5; 11402:5000' }
    })
    handleSendCommand(data)
  }
  const CrashHigh = () => {
    let data = JSON.stringify({
      deviceId: selectedDevice?.id,
      description: 'CT11-CRASH-HIGH',
      type: 'custom',
      attributes: { data: 'setparam 11401:4; 11402:4000' }
    })
    handleSendCommand(data)
  }
  const OverSpeed = () => {
    let data = JSON.stringify({
      deviceId: selectedDevice?.id,
      description: `CT11-OVERSPEED-${sliderValue}`,
      type: 'custom',
      attributes: { data: `setparam 11104:${sliderValue}` }
    })
    handleSendCommand(data)
  }
  const ControlSwitch = e => {
    setControlSwitchVisible(true)
    setRelay(e)
  }
  const handleCrashAlertSubmit = () => {
    if (Tab2 == 1) {
      CrashHigh()
    } else if (Tab2 == 2) {
      CrashLow()
    }
  }
  const handleSpeedAlertSubmit = () => {
    setSpeedAllertVisible(true)
    OverSpeed()
  }

  const content1 = () => {
    return (
      <View style={[styles.collapsContainer]}>
        <Text style={styles.collapsText}>
          با فشردن گزینه "قطع رله” وسیله نقلیه شما بلافاصله خاموش می گردد و تا
          زمانی که بر روی گزینه “اتصال رله” کلیک نکنید امکان روشن کردن مجدد وجود
          نخواهد داشت.
        </Text>
        <View style={styles.submitContainer}>
          <FormBtn
            title={'قطع رله'}
            disabled={isValid}
            error={errors}
            loading={loading}
            handleSubmit={() => ControlSwitch(0)}
            style={[
              styles.submitBtn,
              { backgroundColor: Colors.red, marginRight: 10 }
            ]}
            titleStyle={{ fontSize: 12, alignSelf: 'center' }}
          />
          <FormBtn
            title={'اتصال رله'}
            disabled={isValid}
            error={errors}
            loading={loading}
            handleSubmit={() => ControlSwitch(1)}
            style={styles.submitBtn}
            titleStyle={{ fontSize: 12, alignSelf: 'center' }}
          />
        </View>
      </View>
    )
  }
  const content2 = () => {
    return (
      <View style={[styles.collapsContainer]}>
        <ButtonTab
          {...{
            title1: 'زیاد',
            title2: 'کم'
          }}
          onTabbarPress={setTab2}
        />

        <FormBtn
          title={'ثبت'}
          disabled={isValid}
          error={errors}
          loading={loading}
          handleSubmit={handleCrashAlertSubmit}
          style={styles.submitBtn}
          titleStyle={{ fontSize: 12, alignSelf: 'center' }}
        />
      </View>
    )
  }
  const content3 = () => {
    return (
      <View style={[styles.collapsContainer]}>
        <HandleSlider2 {...{ sliderValue, setSliderValue }} />
        <FormBtn
          title={'ثبت'}
          disabled={isValid}
          error={errors}
          loading={loading}
          handleSubmit={handleSpeedAlertSubmit}
          style={styles.submitBtn}
          titleStyle={{ fontSize: 12, alignSelf: 'center' }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ControlSwitchModal
        isVisible={ControlSwitchVisible}
        setVisible={setControlSwitchVisible}
        {...{ RelayConnect, RelayDisconnect, relay }}
      />
      <SpeedAllertModal
        isVisible={speedAllertVisible}
        setVisible={setSpeedAllertVisible}
        {...{ sliderValue }}
      />
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <SelectDevice {...{ selectedDevice, setSelectedDevice }} />
        {selectedDevice && (
          <View>
            <Colaps
              {...{
                title: 'قطع و وصل کردن رله از راه دور',
                contentHeight: 170
              }}
              content={content1}
              isOpen={openSection === 1}
              toggleSection={() => toggleSection(1)}
              key={1}
            />
            <Colaps
              {...{ title: 'تنظیم هشدار تصادف یا ضربه', contentHeight: 140 }}
              content={content2}
              isOpen={openSection === 2}
              toggleSection={() => toggleSection(2)}
              key={2}
            />
            <Colaps
              {...{ title: 'تنظیم سرعت غیر مجاز', contentHeight: 170 }}
              content={content3}
              isOpen={openSection === 3}
              toggleSection={() => toggleSection(3)}
              key={3}
            />
          </View>
        )}
        {!selectedDevice && (
          <View style={styles.noDeveceSelected}>
            <NoDeviceSelected />
            <Text style={styles.noDevoceText}>دستگاهی انتخاب نشده است.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
export default CommandSendingScreen
