import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { useNotificationApi } from '../../Api/useNotificationApi'
import Colaps2 from '../../Components/Colaps2'
import Header2 from '../../Components/Header2/Header2'
import styles from './NotificationsStyles'

const NotificationsScreen = ({ navigation }) => {
  //============================STATE==========================
  const [notificationList, setNotificationList] = useState([])
  const [openSection, setOpenSection] = useState(null)
  //============================Constants==========================
  const toggleSection = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section))
  }
  const {
    handleGetNotificationList,
    notificationListData,
    notificationListLoading,
    notificationListError
  } = useNotificationApi()
  const {
    handleCreateNotification,
    createNotificationData,
    createNotificationLoading,
    createNotificationError
  } = useNotificationApi()
  const {
    handleEditNotification,
    editNotificationData,
    editNotificationLoading,
    editNotificationError
  } = useNotificationApi()
  const {
    handleDeleteNotification,
    deleteNotificationData,
    deleteNotificationLoading,
    deleteNotificationError
  } = useNotificationApi()
  //============================Functions==========================

  useEffect(() => {
    handleGetNotificationList()
  }, [createNotificationData, deleteNotificationData])
  useEffect(() => {
    NotificationList()
  }, [notificationListData])

  const NotificationList = () => {
    const notification = [
      {
        title: 'موتور روشن',
        description: false,
        id: 1,
        attributes: {},
        calendarId: 0,
        always: true,
        type: 'ignitionOn',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'موتور خاموش',
        description: false,
        id: 2,
        attributes: {},
        calendarId: 0,
        always: true,
        type: 'ignitionOff',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'جابجایی',
        description: false,
        id: 3,
        attributes: {},
        calendarId: 0,
        always: true,
        type: 'deviceMoving',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'توقف',
        description: false,
        id: 4,
        attributes: {},
        calendarId: 0,
        always: true,
        type: 'deviceStopped',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار قطع ولتاژ یا سرقت باتری',
        description: false,
        id: 5,
        attributes: {
          alarms: 'powerCut'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار حمل با جرثقیل',
        description: false,
        id: 6,
        attributes: {
          alarms: 'tow'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار تصادف یا ضربه',
        description: 'accident',
        id: 7,
        attributes: {
          alarms: 'accident'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار شتاب شدید',
        description: false,
        id: 8,
        attributes: {
          alarms: 'hardAcceleration'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار ترمز خطرناک',
        description: false,
        id: 9,
        attributes: {
          alarms: 'hardBraking'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      {
        title: 'هشدار پیچیدن خطرناک',
        description: false,
        id: 10,
        attributes: {
          alarms: 'hardCornering'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      },
      // {
      //   title: 'هشدار باز شدن درب خودرو',
      //   description: false,
      //   id: 11,
      //   attributes: {
      //     alarms: 'door'
      //   },
      //   calendarId: 0,
      //   always: true,
      //   type: 'alarm',
      //   commandId: 0,
      //   notificators: '',
      //   isAlreadyCreated: false
      // },
      {
        title: 'هشدار سرعت غیر مجاز',
        description: 'overspeed',
        id: 12,
        attributes: {
          alarms: 'overspeed'
        },
        calendarId: 0,
        always: true,
        type: 'alarm',
        commandId: 0,
        notificators: '',
        isAlreadyCreated: false
      }
    ]
    const updatedNotification = notification.map(item => {
      const serverItem = notificationListData?.find(
        serverItem => serverItem.type == item.type
      )
      const serverAlarmItem = notificationListData?.find(
        serverItem => serverItem.attributes?.alarms == item.attributes?.alarms
      )
      if (serverItem) {
        if (item.type !== 'alarm') {
          item.id = serverItem.id
          item.notificators = serverItem.notificators
          item.isAlreadyCreated = true
        }
      }
      if (serverAlarmItem) {
        if (
          item.type == 'alarm' &&
          item.attributes.alarms == serverAlarmItem.attributes.alarms
        ) {
          item.attributes = serverAlarmItem.attributes
          item.id = serverAlarmItem.id
          item.notificators = serverAlarmItem.notificators
          item.isAlreadyCreated = true
        }
      }
      return item
    })
    setNotificationList(updatedNotification)
  }

  //============================View==========================
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header2 {...{ navigation }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        {notificationList?.map((item, index) => (
          <Colaps2
            {...{
              item,
              handleCreateNotification,
              handleEditNotification,
              handleDeleteNotification,
              editNotificationLoading,
              deleteNotificationLoading,
              createNotificationLoading
            }}
            isOpen={openSection === index}
            toggleSection={() => toggleSection(index)}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  )
}
export default NotificationsScreen
