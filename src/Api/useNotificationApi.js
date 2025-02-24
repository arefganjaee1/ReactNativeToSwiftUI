import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo'

export const useNotificationApi = () => {
  const { netInfo } = useCheckNetInfo()
  const token = useSelector(state => state.token.token)
  //============================GetNotificationList==========================
  const [notificationListData, setNotificationListData] = useState(null)
  const [notificationListLoading, setNotificationListLoading] = useState(false)
  const [notificationListError, setNotificationListError] = useState('')
  useEffect(() => {
    console.log('>>>loading', notificationListLoading)
    console.log('>>>error', notificationListError)
    console.log('>>>notificationListData', notificationListData)
  }, [notificationListLoading, notificationListError, notificationListData])
  const notificationListRequest = () => {
    setNotificationListData(null)
    setNotificationListLoading(true)
    setNotificationListError('')
  }
  const notificationListSuccess = data => {
    setNotificationListData(data)
    setNotificationListLoading(false)
    setNotificationListError('')
  }
  const notificationListFailure = data => {
    setNotificationListData(null)
    setNotificationListLoading(false)
    setNotificationListError(data)
  }
  const handleGetNotificationList = () => {
    if (netInfo) {
      notificationListRequest()
      var config = {
        method: 'get',
        url: 'https://web.confidentech.net/api/notifications',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          notificationListSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          notificationListFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================CreateNotification==========================
  const [createNotificationData, setCreateNotificationData] = useState(null)
  const [createNotificationLoading, setCreateNotificationLoading] =
    useState(false)
  const [createNotificationError, setCreateNotificationError] = useState('')
  useEffect(() => {
    console.log('>>>loading', createNotificationLoading)
    console.log('>>>error', createNotificationError)
    console.log('>>>createNotificationData', createNotificationData)
  }, [
    createNotificationLoading,
    createNotificationError,
    createNotificationData
  ])
  const createNotificationRequest = () => {
    setCreateNotificationData(null)
    setCreateNotificationLoading(true)
    setCreateNotificationError('')
  }
  const createNotificationSuccess = data => {
    setCreateNotificationData(data)
    setCreateNotificationLoading(false)
    setCreateNotificationError('')
  }
  const createNotificationFailure = data => {
    setCreateNotificationData(null)
    setCreateNotificationLoading(false)
    setCreateNotificationError(data)
  }
  const handleCreateNotification = data => {
    console.log('this is api CreateNotification data >>>>', data)
    if (netInfo) {
      createNotificationRequest()
      var config = {
        method: 'post',
        url: 'https://web.confidentech.net/api/notifications',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: data
      }
      const requestApi = axios(config)
        .then(function (response) {
          createNotificationSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          createNotificationFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================EditNotification==========================
  const [editNotificationData, setEditNotificationData] = useState(null)
  const [editNotificationLoading, setEditNotificationLoading] = useState(false)
  const [editNotificationError, setEditNotificationError] = useState('')
  useEffect(() => {
    console.log('>>>loading', editNotificationLoading)
    console.log('>>>error', editNotificationError)
    console.log('>>>editNotificationData', editNotificationData)
  }, [editNotificationLoading, editNotificationError, editNotificationData])
  const editNotificationRequest = () => {
    setEditNotificationData(null)
    setEditNotificationLoading(true)
    setEditNotificationError('')
  }
  const editNotificationSuccess = data => {
    setEditNotificationData(data)
    setEditNotificationLoading(false)
    setEditNotificationError('')
  }
  const editNotificationFailure = data => {
    setEditNotificationData(null)
    setEditNotificationLoading(false)
    setEditNotificationError(data)
  }
  const handleEditNotification = (data, id) => {
    console.log('this is api data >>>>', data)
    console.log('this is api id >>>>', id)
    if (netInfo) {
      editNotificationRequest()
      var config = {
        method: 'put',
        url: `https://web.confidentech.net/api/notifications/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: data
      }
      const requestApi = axios(config)
        .then(function (response) {
          editNotificationSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          editNotificationFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================DeleteNotification==========================
  const [deleteNotificationData, setDeleteNotificationData] = useState(null)
  const [deleteNotificationLoading, setDeleteNotificationLoading] =
    useState(false)
  const [deleteNotificationError, setDeleteNotificationError] = useState('')
  useEffect(() => {
    console.log('>>>loading', deleteNotificationLoading)
    console.log('>>>error', deleteNotificationError)
    console.log('>>>deleteNotificationData', deleteNotificationData)
  }, [
    deleteNotificationLoading,
    deleteNotificationError,
    deleteNotificationData
  ])
  const deleteNotificationRequest = () => {
    setDeleteNotificationData(null)
    setDeleteNotificationLoading(true)
    setDeleteNotificationError('')
  }
  const deleteNotificationSuccess = data => {
    setDeleteNotificationData(data)
    setDeleteNotificationLoading(false)
    setDeleteNotificationError('')
  }
  const deleteNotificationFailure = data => {
    setDeleteNotificationData(null)
    setDeleteNotificationLoading(false)
    setDeleteNotificationError(data)
  }
  const handleDeleteNotification = id => {
    if (netInfo) {
      deleteNotificationRequest()
      var config = {
        method: 'delete',
        url: `https://web.confidentech.net/api/notifications/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          deleteNotificationSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          deleteNotificationFailure()
          console.log(error)
        })
      return requestApi
    }
  }

  return {
    handleGetNotificationList,
    notificationListData,
    notificationListLoading,
    notificationListError,
    handleCreateNotification,
    createNotificationData,
    createNotificationLoading,
    createNotificationError,
    handleEditNotification,
    editNotificationData,
    editNotificationLoading,
    editNotificationError,
    handleDeleteNotification,
    deleteNotificationData,
    deleteNotificationLoading,
    deleteNotificationError,
    netInfo
  }
}
