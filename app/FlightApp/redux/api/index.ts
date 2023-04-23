import axios from 'axios';
import {API_URL} from '../../config/env';
import {store} from '../store';
import {getUserSuccess} from '../user/user.reducer';
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

// api user
export const getInfoUsers = () => API.get('/user/info');
export const updateInfoUser = async (formData: IUserUpdate) => {
  return await API.put('/user/info', formData);
};

// api flight
export const getFlightList = (params: string) => API.get(`/?req=${params}`);
