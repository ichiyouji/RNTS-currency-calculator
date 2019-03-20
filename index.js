/** @format */

import { Navigation } from "react-native-navigation";

import { withReduxStoreWrapper } from './App';
import { Routes, Components, Init } from '@src/routes';

Routes.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => (props) => withReduxStoreWrapper(ScreenComponent, props), () => ScreenComponent));

Components.forEach((Component, key) =>
  Navigation.registerComponent(key, () => Component));

Navigation.events().registerAppLaunchedListener(() => {
  Init();
});
