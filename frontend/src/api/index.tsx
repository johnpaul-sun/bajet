import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_BACKEND_URL;
const token = Cookies.get('token');

export const apiCall = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
