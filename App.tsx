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
  PureComponent
} from 'react';

import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Navigation } from "react-native-navigation";

import store from '@src/redux/store';
import CurrencyConverter from '@src/containers/CurrencyConverter/CurrencyConverter';
import CurrencyHistory from '@src/containers/CurrencyHistory/CurrencyHistory';

console.disableYellowBox = true;

const persistor = getPersistor();

// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         {/* <PersistGate persistor={persistor}> */}
//           <CurrencyConverter/>
//         {/* </PersistGate> */}
//       </Provider>
//     );
//   }
// }

// Navigation.registerComponent(`RNTS.main`, () => withReduxStoreWrapper(CurrencyConverter, store));
// Navigation.registerComponent(`RNTS.second`, () => withReduxStoreWrapper(CurrencyHistory, store));

export const withReduxStoreWrapper = (Component: any, props: any) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props}/>
      </PersistGate>
    </Provider>
  );


