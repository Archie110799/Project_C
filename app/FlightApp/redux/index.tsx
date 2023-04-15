import React from 'react';
import {Provider} from 'react-redux';

import App from '../App';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

function ReduxApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default ReduxApp;
