import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://eremind-back.herokuapp.com";

export const addReminder = (payload, cb) => {
  axios
    .post(`${BASE_URL}/add/reminder`, payload)
    .then((res) => {
      cb(res.data);
      console.log(res);
    })
    .catch((err) => {
      cb({ error: err?.response?.data });
    });
};

export const getReminder = (cb) => {
  axios
    .get(`${BASE_URL}/get/reminders`)
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.data });
    });
};
