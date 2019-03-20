import { Navigation } from "react-native-navigation";

import colors from '@src/constants/colors';

import CurrencyConverter from '@src/containers/CurrencyConverter/CurrencyConverter';
import CurrencyHistory from '@src/containers/CurrencyHistory/CurrencyHistory';
import CustomIcon from '@src/components/CustomIcon/CustomIcon';

export const CALCULATOR_SCREEN = 'RNTS.calculator';
export const HISTORY_SCREEN = 'RNTS.history';

export const HISTORY_TOPBAR_BUTTON = 'RNTS.topBar.history.button';

export const Routes = new Map();
Routes.set(CALCULATOR_SCREEN, CurrencyConverter);
Routes.set(HISTORY_SCREEN, CurrencyHistory);

export const Components = new Map();
Components.set(HISTORY_TOPBAR_BUTTON, CustomIcon);

export const Init = () => {
  Navigation.setDefaultOptions({
    layout: {
      backgroundColor: colors.background,
    },
    topBar: {
      background: {
        color: colors.background,
      },
      title: {
        color: colors.text,
      },
      backButton: {
        title: 'back',
        color: colors.text,
        visible: true,
      },
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: CALCULATOR_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Currency Converter',
                  }
                }
              }
            }
          }
        ],
      }
    }
  });
}

export const historyScreen = (componentId: string) => {
  return Navigation.push(componentId, {
    component: {
      name: HISTORY_SCREEN,
    },
  })
};