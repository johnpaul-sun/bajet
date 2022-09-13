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
  getAllActiveWallet: () => {
    return userApiCall.get('/wallets/get/all');
  },
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

export const pocketAPI = {
  getAllActivePocket: () => {
    return userApiCall.get('/pockets/get/all');
  },
  getAllPocket: (page: number, data: any) => {
    return userApiCall.get(`/pockets?
    page=${page}&
    sort_by=${data.sort_by}&
    sort_type=${data.sort_type}&
    archive=${data.archive}`);
  },
  createPocket: (data: any) => {
    return userApiCall.post('/pockets', data);
  },
  getSpecificPocket: (id: number) => {
    return userApiCall.get(`/pockets/${id}`);
  },
  updateSpecificPocket: (id: number, data: any) => {
    return userApiCall.put(`/pockets/${id}`, data);
  },
  archivePocket: (id: number) => {
    return userApiCall.post(`/pockets/archive/${id}`);
  },
  unarchivePocket: (id: number) => {
    return userApiCall.post(`/pockets/unarchive/${id}`);
  },
  deletePocket: (id: number) => {
    return userApiCall.delete(`/pockets/${id}`);
  },
  payBalance: (data: any) => {
    return userApiCall.post('/pockets/pay', data);
  }
}

export const historyAPI = {
  getAllHistory: () => {
    return userApiCall.get('/history/all');
  }
}