/** @format */

import { Navigation } from "react-native-navigation";
import { withReduxStoreWrapper } from './App';

import CurrencyConverter from '@src/containers/CurrencyConverter/CurrencyConverter';
import CurrencyHistory from '@src/containers/CurrencyHistory/CurrencyHistory';
import CustomIcon from '@src/components/CustomIcon/CustomIcon';

Navigation.registerComponent("topBar.button.history", () => CustomIcon);

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
                    text: 'LaLiLuLeLo',
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

Navigation.setDefaultOptions({
  topBar: {
    backButton: {
      title: 'back',
      visible: true
    },
  },
});
