import { userApiCall, adminApiCall } from '.';

// Update Type in integration 
export const userAPI = {
  register: (data: any) => {
    return userApiCall.post('/users', data);
  },
  verifyEmail: () => {
    return userApiCall.get(`/users/email/verify`);
  },
  resendVerification: () => {
    return userApiCall.get('/users/email/resend');
  },
  forgotPassword: (data: any) => {
    return userApiCall.post('/users/forgot-password', data);
  },
  inputNewPassword: (data: any) => {
    return userApiCall.post('/users/reset-password', data);
  },
  login: (data: any) => {
    return userApiCall.post('/users/login', data);
  },
  updateDetails: (data: any) => {
    return userApiCall.put('/users', data);
  },
  updateAvatar: () => {
    return userApiCall.put('/users/avatar');
  },
  getUser: (id: number) => {
    return userApiCall.get(`/users/${id}`);
  },
  getUsers: () => {
    return userApiCall.get(`/users`);
  },
  logout: () => {
    return userApiCall.post('/users/logout');
  },
} 