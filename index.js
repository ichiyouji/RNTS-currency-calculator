/** @format */

// import {AppRegistry} from 'react-native';
import { Navigation } from "react-native-navigation";
// import App from './App';
import { withReduxStoreWrapper } from './App';
// import {name as appName} from './app.json';
import store from '@src/redux/store';
import CurrencyConverter from '@src/containers/CurrencyConverter/CurrencyConverter';
import CurrencyHistory from '@src/containers/CurrencyHistory/CurrencyHistory';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent(`RNTS.main`, () => (props) => withReduxStoreWrapper(CurrencyConverter, props), () => CurrencyConverter);
Navigation.registerComponent(`RNTS.second`, () => (props) => withReduxStoreWrapper(CurrencyHistory, props), () => CurrencyHistory);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'RNTS.main',
              options: {
                topBar: {
                  title: {
                    text: 'LaLiLuLeLo'
                  }
                }
              }
            }
          }
        ],
      }
    }
  });
});
