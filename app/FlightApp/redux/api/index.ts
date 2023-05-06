import axios from 'axios';
import {API_URL} from '../../config/env';
import {store} from '../store';
import {getUserSuccess} from '../user/user.reducer';
import {formatDate} from '../../utils/date';
const {dispatch} = store;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Custom-Header': 'flight',
  },
});

API.interceptors.request.use(
  async (config: any) => {
    // NetInfo.fetch().then(isConnected => {
    //   if (!isConnected.isConnected) {
    //     const CancelToken = axios.CancelToken;
    //     return {
    //       ...config,
    //       cancelToken: new CancelToken(cancel => cancel(HTTPError.DISCONNECT)),
    //     };
    //   }
    // });
    // const {userRedux} = store.getState().user;
    // return {
    //   ...config,
    //   headers: {
    //     ...config.headers,
    //     Authorization: `Bearer ${userRedux?.access_token}`,
    //   },
    // };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for API calls
API.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response?.status === 500) {
      console.log('API 500');
    }

    const urlNotAuth = ['/auth/new-token', '/user/login'];

    if (
      error.response?.status === 401 &&
      !urlNotAuth?.includes(originalRequest)
    ) {
      await refreshToken();
      return API(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const refreshToken = async () => {
  const {user} = store.getState().user;
  //   if (user?.refresh_token) {
  //     return userSigninToken({
  //       refresh_token: user?.refresh_token,
  //     })
  //       .then(async res => {
  //         dispatch(getUserSuccess(res?.data?.data));
  //       })
  //       .catch(error => {
  //         console.log('87 userSigninToken', error);
  //         return Promise.reject(error);
  //       });
  //   }
};

// api auth
export const loginAPI = (params: IRequestLogin) =>
  API.post('/user/login', params);

export const registerAPI = (params: IRequestRegister) =>
  API.post('/user', params);

// api user
export const getListUsers = () => API.get('/user');

export const updateUser = async (
  formData: IRequestRegister,
  userId: string | number,
) => {
  return await API.put(`/user/${userId}`, formData);
};

export const deleteUser = async (userId: string | number) => {
  return await API.delete(`/user/${userId}`);
};

// api flight
export const getFlightList = (params: string) => API.get(`/?req=${params}`);

// api Order
export const getListFlightOrder = () => API.get(`/flight`);
export const getListFlightOrderByUser = (userId: string | number) =>
  API.get(`/flight/${userId}`);

export const createFlightOrder = async (formData: IRequestOrder) => {
  return await API.post('/flight', formData);
};

// api province
export const getProvinceList = () => API.get(`/provinces`);
