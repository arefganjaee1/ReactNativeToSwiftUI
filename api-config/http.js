/*
 * Http interceptor is defined here
 * */
import axios from 'axios';
import { BASE_URL } from './enviroment/enviroment';
import * as variables from './variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.request.use(
  async (config) => {
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      // let token = JSON.parse(jsonValue);
      let Authorization =
        'Bearer RzBFAiEA57HyU-_8riHGCxQAh-FvajdX42l7IS6RExET0zsW6zsCIGahaIyw1sCwdvkiiQDZu_0OnV1TSJWuDHqTm8xg4zYAeyJ1IjoyOCwiZSI6IjIwMjQtMDEtMTJUMjA6MzA6MDAuMDAwKzAwOjAwIn0';
      let Cookie = 'JSESSIONID=node0smxdj7cv4q0071i859k9n4i620.node0';
      console.log('token>>>>>>>>>>>>', token);
      if (Authorization) {
        config.headers.Authorization = Authorization;
        config.headers.Cookie = Cookie;
      }
      return config;
    } catch (e) {}
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
