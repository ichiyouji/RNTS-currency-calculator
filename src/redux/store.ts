import { init, RematchRootState } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import { AsyncStorage } from 'react-native';
import * as models from './models';

const persistConfig = {
  whitelist: ['history'],
  storage: AsyncStorage,
  throttle: 3000,
  version: 1,
};

const persistPlugin = createRematchPersist(persistConfig);

const initConfig = {
  models,
  plugins: [persistPlugin]
}

const store = init(initConfig);

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;

export default store