import {getProvinceList} from '../api';
import {AppThunk} from '../store';
import {
  getProvinceFailure,
  getProvinceStart,
  getProvinceSuccess,
} from './province.reducer';

export const getListProvinceAsync = (): AppThunk => async dispatch => {
  dispatch(getProvinceStart());
  return getProvinceList()
    .then((response: any) => {
      dispatch(getProvinceSuccess(response?.data));
      return response;
    })
    .catch(error => {
      dispatch(getProvinceFailure(error));
      return error;
    })
    .finally(() => {
      console.log('--------getFlightList finaly');
    });
};
