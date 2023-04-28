import {useDispatch} from 'react-redux';
import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {Action, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserReducer from './user/user.reducer';
import FlightReducer from './flight/flight.reducer';
import CommonReducer from './common/common.reducer';
import ProvinceReducer from './province/province.reducer';
import OrderReducer from './order/order.reducer'

const loggerMiddleware = createLogger();

const reducers = combineReducers({
  common: CommonReducer,
  user: UserReducer,
  flight: FlightReducer,
  province: ProvinceReducer,
  order : OrderReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware);
  },
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
