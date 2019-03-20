import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import { historyScreen, HISTORY_TOPBAR_BUTTON } from '@src/routes';
import { RootState, Dispatch } from '@src/redux/store';
import CurrencyInput from '@src/components/CurrencyInput/CurrencyInput';
import CurrencyPicker from '@src/components/CurrencyPicker/CurrencyPicker';
import * as utils from '@src/constants/utils';
import colors from '@src/constants/colors';
import defaultStyles from '@src/constants/defaultStyles';
import { CurrencyListItem, HistoryListItem, commonScreenProps } from '@src/constants/types';

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 80,
    flexDirection: 'column',
  },
  titleContainer: {
    height: defaultStyles.deviceHeight / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.text,
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputWrapper: {
    width: defaultStyles.deviceWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 30,
  },
  inputWrapperTop: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});

type connectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = connectedProps & commonScreenProps;

const mapCurrencyData = (item: CurrencyListItem, index: number) => ({
  label: item.currency + " " + item.name,
  value: item.currency,
})

class CurrencyConverter extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [{
          id: HISTORY_TOPBAR_BUTTON,
          component: {
            name: HISTORY_TOPBAR_BUTTON,
            passProps: {
              onPress: this.navigationButtonPressed,
              name: 'history',
              colors: colors.text,
            } 
          }
        }]
      }
    })
  }

  state = {
    dialogVisible: false,
  }

  componentWillMount() {
    this.props.fetchCurrency();
  }

  navigationButtonPressed = () => {
    return historyScreen(this.props.componentId);
  }

  _setInitialValue = (value: string) => {
    const { initialCurrency, targetCurrency } = this.props;

    const strip = utils.cleanInputValue(value)

    this.props.setInitialValue(strip);

    this.props.saveToHistory({
      initialCurrency,
      targetCurrency
    })
  }

  _toggleHistoryList = () => {
    return historyScreen(this.props.componentId);
  }

  _recentSelected = (param: HistoryListItem) => () => {
    this.props.selectFromHistory(param);
    this._toggleHistoryList();
  }

  render() {
    console.log(this.props.currencyHistoryList);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, styles.inputWrapperTop]}>
            <CurrencyPicker
              defaultCurrency={this.props.initialCurrency}
              value={this.props.initialCurrency}
              pickerList={this.props.currencyList.map(mapCurrencyData)}
              onChange={this.props.initialCurrencyChange}
            />
            <CurrencyInput
              value={this.props.initialValue}
              onChange={this._setInitialValue}
              defaultValue={'0'}
              placeholder={`input in ${this.props.initialCurrency}`}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CurrencyPicker
              defaultCurrency={this.props.targetCurrency}
              value={this.props.targetCurrency}
              pickerList={this.props.currencyList.map(mapCurrencyData)}
              onChange={this.props.targetCurrencyChange}
            />
            <CurrencyInput
              value={this.props.targetValue}
              defaultValue={'0'}
              placeholder={`result in ${this.props.targetCurrency}`}
              editable={false}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  currencyList: state.currency.currencyList,
  initialValue: state.currency.initialValue,
  targetValue: state.currency.targetValue,
  initialCurrency: state.currency.initialCurrency,
  targetCurrency: state.currency.targetCurrency,
  currencyHistoryList: state.history.currencyHistoryList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCurrency: dispatch.currency.getCurrencyList,
  setInitialValue: (value: string) => dispatch.currency.setInitialValue(value),
  initialCurrencyChange: (value: string) => dispatch.currency.setInitialCurrency(value),
  targetCurrencyChange: (value: string) => dispatch.currency.setTargetCurrency(value),
  saveToHistory: (param: any) => dispatch.history.storeCurrencyHistory(param),
  selectFromHistory: (param: any) => dispatch.history.selectFromHistory(param),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter)

