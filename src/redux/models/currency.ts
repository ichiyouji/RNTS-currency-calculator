import { createModel } from '@rematch/core';

import * as CurrencyService from '@src/service/CurrencyService';
import { CurrencyListItem, HistoryListItem } from '@src/constants/types';
import { Dispatch } from '@src/redux/store';

export type CurrencyState = {
  initialValue: string,
  targetValue: string,
  initialCurrency: string,
  targetCurrency: string,
  currencyList: Array<CurrencyListItem>,
  loading: boolean,
};

const formatResult = (result: any) => {
  const rates = Object.keys(result.rates).map((key) => {
    return { currency: key, rate: result.rates[key] };
  });

  return [
    { currency: result.base, rate: 1 }
  ].concat(rates);
}

const findInCurrencyRate = (array: Array<CurrencyListItem>, name: string) => {
  
  return array.find((el) => {
    return el.currency === name;
  });
}

const calculateTargetValue = (
  currencyList: Array<CurrencyListItem>,
  initialValue: string,
  initialCurrency: string,
  targetCurrency: string,
) => {

  const initialRate: CurrencyListItem | undefined = findInCurrencyRate(currencyList, initialCurrency);
  if(!initialRate) return '0';

  const targetRate: CurrencyListItem | undefined = findInCurrencyRate(currencyList, targetCurrency);
  if(!targetRate) return '0';

  const newRate = parseFloat(initialValue) * parseFloat(targetRate.rate) / parseFloat(initialRate.rate);
  if(!newRate) return '0';

  const newRateFixed = newRate.toFixed(2);

  return newRateFixed.toString();
};

export default createModel({
	state: {
    initialValue: '0',
    targetValue: '0',
    initialCurrency: 'EUR',
    targetCurrency: 'USD',
    currencyList: [],
  },
	reducers: {
    setInitialCurrency: (state: CurrencyState, payload: string) => {
      const result = calculateTargetValue(
        state.currencyList,
        state.initialValue,
        payload,
        state.targetCurrency,
      )
      return {
        ...state,
        initialCurrency: payload,
        targetValue: result,
      }
    },
    setTargetCurrency: (state: CurrencyState, payload: string) => {
      const result = calculateTargetValue(
        state.currencyList,
        state.initialValue,
        state.initialCurrency,
        payload,
      )
      return {
        ...state,
        targetCurrency: payload,
        targetValue: result,
      }
    },
    setInitialValue: (state: CurrencyState, payload: string) => {
      const result = calculateTargetValue(
        state.currencyList,
        payload,
        state.initialCurrency,
        state.targetCurrency,
      )
      return {
        ...state,
        initialValue: payload,
        targetValue: result,
      }
    },
    calculateValue: (state: CurrencyState) => {
      const result = calculateTargetValue(
        state.currencyList,
        state.initialValue,
        state.initialCurrency,
        state.targetCurrency,
      )
      return {
        ...state,
        targetValue: result,
      }
    },
    setCurrencyFromHistory: (state: CurrencyState, payload: HistoryListItem) => {
      const { initialCurrency, targetCurrency } = payload;
      return {
        ...state,
        initialCurrency,
        targetCurrency,
      }
    },
    setCurrencyList: (state: CurrencyState, payload: Array<CurrencyListItem>) => ({
      ...state,
      currencyList: payload
    }),
  },
  effects: () => {
    return {
      async getCurrencyList(): Promise<void> {
        const result = formatResult(await CurrencyService.fetchCurrency());
        this.setCurrencyList(result);
      }
    }
  }
})