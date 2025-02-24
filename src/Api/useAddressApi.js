import React, {useState } from 'react';
import { useCheckNetInfo } from '../Hooks/useCheckNetInfo';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const useAddressApi = () => {
  const { netInfo } = useCheckNetInfo();
  const token = useSelector((state) => state.token.token);
  //============================GetAddress==========================
  const [addressData, setAddressData] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const addressRequest = () => {
    setAddressData(null);
    setAddressLoading(true);
    setAddressError('');
  };
  const addressSuccess = (data) => {
    setAddressData(data);
    setAddressLoading(false);
    setAddressError('');
  };
  const addressFailure = (data) => {
    setAddressData(null);
    setAddressLoading(false);
    setAddressError(data);
  };

  const handleGetAddress = async (latitude, longitude) => {
    try {
      const response = await fetchAddressFromServer(latitude, longitude);
      addressSuccess(response?.data);
      return response;
    } catch (error) {
      addressFailure();
      throw error;
    }
  };
  const fetchAddressFromServer = (latitude, longitude) => {
    if (netInfo) {
      addressRequest();
      const config = {
        method: 'get',
        url: `https://web.confidentech.net/api/server/geocode?latitude=${latitude}&longitude=${longitude}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return axios(config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return {
    handleGetAddress,
    addressData,
    addressLoading,
    addressError,
  };
};
