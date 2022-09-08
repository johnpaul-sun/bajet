import { userApiCall, adminApiCall } from '.';

// Update Type in integration 
export const userAPI = {
  register: (data: any) => {
    return userApiCall.post('/users', data);
  },
  verifyEmail: () => {
    return userApiCall.get('/users/email/verify');
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

export const walletAPI = {
  getAllWallet: (page: number, data: any) => {
    return userApiCall.get(`/wallets?
    page=${page}&
    sort_by=${data.sort_by}&
    sort_type=${data.sort_type}&
    archive=${data.archive}`);
  },
  createWallet: (data: any) => {
    return userApiCall.post('/wallets', data);
  },
  getSpecificWallet: (id: number) => {
    return userApiCall.get(`/wallets/${id}`);
  },
  updateSpecificWallet: (id: number, data: any) => {
    return userApiCall.put(`/wallets/${id}`, data);
  },
  archiveWallet: (id: number) => {
    return userApiCall.post(`/wallets/archive/${id}`);
  },
  unarchiveWallet: (id: number) => {
    return userApiCall.post(`/wallets/unarchive/${id}`);
  },
  deleteWallet: (id: number) => {
    return userApiCall.delete(`/wallets/${id}`);
  }
}
