import http from '../http';
import * as urls from '../urls';

export default {
  getUserDevices: function (data) {
    return new Promise((resolve, reject) => {
      http
        .get(`${urls.DEVICES}?${data}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
