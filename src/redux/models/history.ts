import { createModel } from '@rematch/core';
import { HistoryListItem } from '@src/constants/types';
import { Dispatch } from '@src/redux/store';

const formatHistoryList = (state: HistoryState, payload: HistoryListItem) => {
  const { currencyHistoryList } = state;

  if(payload.initialCurrency === payload.targetCurrency) {
    return currencyHistoryList;
  }

  currencyHistoryList.some((item: HistoryListItem, index: number) => {
    if(
      item.initialCurrency === payload.initialCurrency &&
      item.targetCurrency === payload.targetCurrency
    ){
      currencyHistoryList.splice(index, 1);
      return true;
    }
    return false;
  });

  currencyHistoryList.unshift(payload);

  if(currencyHistoryList.length > 8) currencyHistoryList.pop();

  return currencyHistoryList;
}

export type HistoryState = {
  currencyHistoryList: Array<HistoryListItem>,
  showHistory: boolean,
}

export default createModel({
	state: {
    currencyHistoryList: [],
    showHistory: false,
  },
	reducers: {
    storeCurrencyHistory: (state: HistoryState, payload: HistoryListItem) => {
      const formatHistory = formatHistoryList(state, payload);
      return {
        ...state,
        currencyHistoryList: formatHistory
      }
    },
    setHistoryState: (state: HistoryState, payload: boolean) => {
      return {
        ...state,
        showHistory: payload,
      }
    }
  },
  effects: (dispatch) => {
    const currencyDispatch = (<Dispatch> dispatch).currency;
    return {
      selectFromHistory(param) {
        currencyDispatch.setCurrencyFromHistory(param);
        currencyDispatch.calculateValue();
        this.storeCurrencyHistory(param);
      }
    }
  }
})