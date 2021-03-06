import React from 'react';

import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from '@src/redux/store';

console.disableYellowBox = true;

const persistor = getPersistor();

export const withReduxStoreWrapper = (Component: any, props: any) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Component {...props}/>
    </PersistGate>
  </Provider>
);


