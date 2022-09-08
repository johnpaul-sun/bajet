import axios from 'axios';
import Cookies from 'js-cookie';


const baseURL = process.env.REACT_APP_BACKEND_URL;
const userToken = Cookies.get('user_token');
const adminToken = Cookies.get('admin_token');

export const userApiCall = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${userToken}`
  },
});

export const adminApiCall = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${adminToken}`
  },
});
