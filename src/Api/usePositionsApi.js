import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo'

export const usePositionsApi = () => {
  const { netInfo } = useCheckNetInfo()
  const token = useSelector(state => state.token.token)
  //============================GetMap==========================
  const [positionsData, setPositionsData] = useState(null)
  const [positionsLoading, setPositionsLoading] = useState(false)
  const [positionsError, setPositionsError] = useState('')
  useEffect(() => {
    console.log('>>>loading', positionsLoading)
    console.log('>>>error', positionsError)
    console.log('>>>positionsData', positionsData)
  }, [positionsLoading, positionsError, positionsData])
  const positionsRequest = () => {
    setPositionsData(null)
    setPositionsLoading(true)
    setPositionsError('')
  }
  const positionsSuccess = data => {
    setPositionsData(data)
    setPositionsLoading(false)
    setPositionsError('')
  }
  const positionsFailure = data => {
    setPositionsData(null)
    setPositionsLoading(false)
    setPositionsError(data)
  }
  const handleGetPositions = data => {
    if (netInfo) {
      positionsRequest()
      var config = {
        method: 'get',
        url: 'https://app.toluearyan.com/api/positions',
        headers: {
          Authorization:
            'Bearer RzBFAiEA57HyU-_8riHGCxQAh-FvajdX42l7IS6RExET0zsW6zsCIGahaIyw1sCwdvkiiQDZu_0OnV1TSJWuDHqTm8xg4zYAeyJ1IjoyOCwiZSI6IjIwMjQtMDEtMTJUMjA6MzA6MDAuMDAwKzAwOjAwIn0',
          Cookie: 'JSESSIONID=node0smxdj7cv4q0071i859k9n4i620.node0'
        }
      }
      const requestApi = axios(config)
        .then(function (response) {
          positionsSuccess(response?.data)
          console.log(JSON.stringify(response?.data))
        })
        .catch(function (error) {
          positionsFailure()
          console.log(error)
        })
      return requestApi
    }
  }

  return {
    handleGetPositions,
    positionsData,
    positionsLoading,
    positionsError,
    netInfo
  }
}
