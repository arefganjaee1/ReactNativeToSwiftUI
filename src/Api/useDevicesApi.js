import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo'
import { setDevice } from '../Stores/actions/DeviceAction'
import { setDevices } from '../Stores/actions/DevicesAction'

export const useDevicesApi = () => {
  const dispatch = useDispatch()
  const { netInfo } = useCheckNetInfo()
  const token = useSelector(state => state.token.token)
  const Device = useSelector(state => state.device.device)
  //============================GetDevices==========================
  const [devicesData, setDevicesData] = useState(null)
  const [devicesLoading, setDevicesLoading] = useState(false)
  const [devicesError, setDevicesError] = useState('')
  const devicesRequest = () => {
    setDevicesData(null)
    setDevicesLoading(true)
    setDevicesError('')
  }
  const devicesSuccess = data => {
    dispatch(setDevices(data))
    setDevicesData(data)
    setDevicesLoading(false)
    setDevicesError('')
  }
  const devicesFailure = data => {
    setDevicesData(null)
    setDevicesLoading(false)
    setDevicesError(data)
  }
  const handleGetDevices = () => {
    if (netInfo) {
      devicesRequest()
      var config = {
        method: 'get',
        url: 'https://web.confidentech.net/api/devices',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          devicesSuccess(response?.data)
          dispatch(setDevice(Device ? Device : response?.data?.[0]))
        })
        .catch(function (error) {
          devicesFailure()
        })
      return requestApi
    }
  }
  //============================EditDevice==========================
  const [editDeviceData, setEditDeviceData] = useState(null)
  const [editDeviceLoading, setEditDeviceLoading] = useState(false)
  const [editDeviceError, setEditDeviceError] = useState('')
  const editDeviceRequest = () => {
    setEditDeviceData(null)
    setEditDeviceLoading(true)
    setEditDeviceError('')
  }
  const editDeviceSuccess = data => {
    setEditDeviceData(data)
    setEditDeviceLoading(false)
    setEditDeviceError('')
  }
  const editDeviceFailure = data => {
    setEditDeviceData(null)
    setEditDeviceLoading(false)
    setEditDeviceError(data)
  }
  const handleEditDevice = data => {
    console.log('data >>', data)
    let deviceData = JSON.stringify(data)
    if (netInfo) {
      editDeviceRequest()
      var config = {
        method: 'put',
        url: `https://web.confidentech.net/api/devices/${data.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: deviceData
      }
      const requestApi = axios(config)
        .then(function (response) {
          editDeviceSuccess(response?.data)
        })
        .catch(function (error) {
          editDeviceFailure()
        })
      return requestApi
    }
  }

  return {
    handleGetDevices,
    devicesData,
    devicesLoading,
    devicesError,
    handleEditDevice,
    editDeviceData,
    editDeviceLoading,
    editDeviceError,
    netInfo
  }
}
