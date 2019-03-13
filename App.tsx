/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {
  Component
} from 'react';

import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from '@src/redux/store';
import CurrencyConverter from '@src/containers/CurrencyConverter/CurrencyConverter';

console.disableYellowBox = true;

const persistor = getPersistor();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CurrencyConverter/>
        </PersistGate>
      </Provider>
    );
  }
}

