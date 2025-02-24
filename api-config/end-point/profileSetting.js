import http from '../http';
import * as urls from '../urls';

export default {
  getUserProfile: function (data) {
    return new Promise((resolve, reject) => {
      http
        .get(`${urls.GET_USER_PROFILE}?${data}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  saveProfile: function (data) {
    return new Promise((resolve, reject) => {
      http
        .get(`${urls.SAVE_USER_PROFILE}?${data}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  transactionFilterList: function (data) {
    return new Promise((resolve, reject) => {
      http
        .get(`${urls.TRANSACTION_FILTER_LIST}?${data}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  transactionList: function (data) {
    return new Promise((resolve, reject) => {
      http
        .get(`${urls.USER_TRANSACTION_LIST}?${data}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
