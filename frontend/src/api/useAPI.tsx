import { apiCall } from '.';

// Update Type in integration 
export const userAPI = {
  register: (data: any) => {
    return apiCall.post('/users', data);
  },
  verifyEmail: (id: number) => {
    return apiCall.get(`/users/email/verify/${id}`);
  },
  resendVerification: () => {
    return apiCall.get('/users/email/resend');
  },
  forgotPassword: (data: any) => {
    return apiCall.post('/users/forgot-password', data);
  },
  inputNewPassword: (data: any) => {
    return apiCall.post('/users/reset-password', data);
  },
  login: (data: any) => {
    return apiCall.post('/users/login', data);
  },
  updateDetails: (data: any) => {
    return apiCall.put('/users', data);
  },
  updateAvatar: () => {
    return apiCall.put('/users/avatar');
  },
  getUser: (id: number) => {
    return apiCall.get(`/users/${id}`);
  },
  getUsers: () => {
    return apiCall.get(`/users`);
  },
  logout: () => {
    return apiCall.post('/users/logout');
  },
} 