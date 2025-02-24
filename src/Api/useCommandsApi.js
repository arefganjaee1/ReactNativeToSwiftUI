import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo'

export const useCommandsApi = () => {
  const { netInfo } = useCheckNetInfo()
  const token = useSelector(state => state.token.token)
  //============================SendCommand==========================
  const [sendCommandData, setSendCommandData] = useState(null)
  const [sendCommandLoading, setSendCommandLoading] = useState(false)
  const [sendCommandError, setSendCommandError] = useState('')
  useEffect(() => {
    console.log('>>>loading', sendCommandLoading)
    console.log('>>>error', sendCommandError)
    console.log('>>>sendCommandData', sendCommandData)
  }, [sendCommandLoading, sendCommandError, sendCommandData])
  const sendCommandRequest = () => {
    setSendCommandData(null)
    setSendCommandLoading(true)
    setSendCommandError('')
  }
  const sendCommandSuccess = data => {
    setSendCommandData(data)
    setSendCommandLoading(false)
    setSendCommandError('')
  }
  const sendCommandFailure = data => {
    setSendCommandData(null)
    setSendCommandLoading(false)
    setSendCommandError(data)
  }
  const handleSendCommand = data => {
    if (netInfo) {
      sendCommandRequest()
      var config = {
        method: 'post',
        url: 'https://web.confidentech.net/api/commands/send',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: data
      }
      const requestApi = axios(config)
        .then(function (response) {
          sendCommandSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          sendCommandFailure()
          console.log(error)
        })
      return requestApi
    }
  }

  return {
    handleSendCommand,
    sendCommandData,
    sendCommandLoading,
    sendCommandError,
    netInfo
  }
}
