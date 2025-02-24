import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo'

export const useReportsApi = () => {
  const { netInfo } = useCheckNetInfo()
  const token = useSelector(state => state.token.token)
  //============================Trips==========================
  const [tripsData, setTripsData] = useState(null)
  const [tripsLoading, setTripsLoading] = useState(false)
  const [tripsError, setTripsError] = useState('')
  const [showEmpty, setShowEmpty] = useState(false)
  useEffect(() => {
    console.log('>>>loading', tripsLoading)
    console.log('>>>error', tripsError)
    console.log('>>>tripsData', tripsData)
  }, [tripsLoading, tripsError, tripsData])
  const tripsRequest = () => {
    setShowEmpty(false)
    setTripsData(null)
    setTripsLoading(true)
    setTripsError('')
  }
  const tripsSuccess = data => {
    setTripsData(data)
    if (data.length == 0) {
      setShowEmpty(true)
    }
    setTripsLoading(false)
    setTripsError('')
  }
  const tripsFailure = data => {
    setTripsData(null)
    setTripsLoading(false)
    setTripsError(data)
  }

  const handleGetTripsReport = (deviceId, fromDate, toDate) => {
    console.log(deviceId, fromDate, toDate)
    if (netInfo) {
      tripsRequest()
      var config = {
        method: 'get',
        url: `https://web.confidentech.net/api/reports/trips?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          tripsSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          tripsFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================Stops==========================
  const [stopsData, setStopsData] = useState(null)
  const [stopsLoading, setStopsLoading] = useState(false)
  const [stopsError, setStopsError] = useState('')
  useEffect(() => {
    console.log('>>>loading', stopsLoading)
    console.log('>>>error', stopsError)
    console.log('>>>stopsData', stopsData)
  }, [stopsLoading, stopsError, stopsData])
  const stopsRequest = () => {
    setShowEmpty(false)
    setStopsData(null)
    setStopsLoading(true)
    setStopsError('')
  }
  const stopsSuccess = data => {
    if (data.length == 0) {
      console.log('emptyyy')
      setShowEmpty(true)
    }
    setStopsData(data)
    setStopsLoading(false)
    setStopsError('')
  }
  const stopsFailure = data => {
    setStopsData(null)
    setStopsLoading(false)
    setStopsError(data)
  }
  const handleGetStopsReport = (deviceId, fromDate, toDate) => {
    if (netInfo) {
      stopsRequest()
      var config = {
        method: 'get',
        url: `https://web.confidentech.net/api/reports/stops?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          stopsSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          stopsFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================Route==========================
  const [routeData, setRouteData] = useState(null)
  const [routeLoading, setRouteLoading] = useState(false)
  const [routeError, setRouteError] = useState('')
  useEffect(() => {
    console.log('>>>loading', routeLoading)
    console.log('>>>error', routeError)
    console.log('>>>routeData', routeData)
  }, [routeLoading, routeError, routeData])
  const routeRequest = () => {
    setShowEmpty(false)
    setRouteData(null)
    setRouteLoading(true)
    setRouteError('')
  }
  const routeSuccess = data => {
    if (data.length == 0) {
      setShowEmpty(true)
    }
    setRouteData(data)
    setRouteLoading(false)
    setRouteError('')
  }
  const routeFailure = data => {
    setRouteData(null)
    setRouteLoading(false)
    setRouteError(data)
  }
  const handleGetRouteReport = (deviceId, fromDate, toDate) => {
    if (netInfo) {
      routeRequest()
      var config = {
        method: 'get',
        url: `https://web.confidentech.net/api/reports/route?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          routeSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          routeFailure()
          console.log(error)
        })
      return requestApi
    }
  }
  //============================Summary==========================
  const [summaryData, setSummaryData] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryError, setSummaryError] = useState('')
  useEffect(() => {
    console.log('>>>loading', summaryLoading)
    console.log('>>>error', summaryError)
    console.log('>>>summaryData', summaryData)
  }, [summaryLoading, summaryError, summaryData])
  const summaryRequest = () => {
    setSummaryData(null)
    setSummaryLoading(true)
    setSummaryError('')
  }
  const summarySuccess = data => {
    setSummaryData(data)
    setSummaryLoading(false)
    setSummaryError('')
  }
  const summaryFailure = data => {
    setSummaryData(null)
    setSummaryLoading(false)
    setSummaryError(data)
  }
  const handleGetSummaryReport = (deviceId, fromDate, toDate) => {
    if (netInfo) {
      summaryRequest()
      var config = {
        method: 'get',
        url: `https://web.confidentech.net/api/reports/summary?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          summarySuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          summaryFailure()
          console.log(error)
        })
      return requestApi
    }
  }

  return {
    handleGetTripsReport,
    tripsData,
    tripsLoading,
    tripsError,
    showEmpty,
    setShowEmpty,
    handleGetStopsReport,
    stopsData,
    stopsLoading,
    stopsError,
    handleGetSummaryReport,
    summaryData,
    summaryLoading,
    summaryError,
    handleGetRouteReport,
    routeData,
    routeLoading,
    routeError,
    netInfo
  }
}
