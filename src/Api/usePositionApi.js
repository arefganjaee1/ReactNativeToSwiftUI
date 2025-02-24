import React, { useEffect, useState } from 'react';
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const usePositionApi = () => {
  const { netInfo } = useCheckNetInfo();
  const token = useSelector((state) => state.token.token);
  //============================GetPosition==========================
  const [positionData, setPositionData] = useState([]);
  const [positionLoading, setPositionLoading] = useState(false);
  const [positionError, setPositionError] = useState('');
  const positionRequest = () => {
    setPositionData(null);
    setPositionLoading(true);
    setPositionError('');
  };
  const positionSuccess = (data) => {
    setPositionData(data);
    setPositionLoading(false);
    setPositionError('');
  };
  const positionFailure = (data) => {
    setPositionData(null);
    setPositionLoading(false);
    setPositionError(data);
  };
  const handleGetPosition = () => {
    if (netInfo) {
      positionRequest();
      var config = {
        method: 'get',
        url: 'https://web.confidentech.net/api/positions',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const requestApi = axios(config)
        .then(function (response) {
          positionSuccess(response?.data);
        })
        .catch(function (error) {
          positionFailure();
        });
      return requestApi;
    }
  };

  return {
    handleGetPosition,
    positionData,
    positionLoading,
    positionError,
  };
};
