export interface CurrencyListItem {
  currency: string;
  rate: string;
  name: string;
}

export interface HistoryListItem {
  initialCurrency: string,
  targetCurrency: string,
}

export interface commonScreenProps {
  componentId: string,
}