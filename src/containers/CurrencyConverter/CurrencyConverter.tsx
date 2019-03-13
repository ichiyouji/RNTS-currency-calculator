import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@src/redux/store';
import CurrencyInput from '@src/components/CurrencyInput/CurrencyInput';
import CurrencyPicker from '@src/components/CurrencyPicker/CurrencyPicker';
import CurrencyHistory from '@src/components/CurrencyHistory/CurrencyHistory';
import * as utils from '@src/constants/utils';
import colors from '@src/constants/colors';
import defaultStyles from '@src/constants/defaultStyles';
import { CurrencyListItem, HistoryListItem } from '@src/constants/types';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  titleContainer: {
    height: defaultStyles.deviceHeight / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.green,
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
    paddingVertical: 10,
  },
});

type connectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = connectedProps;

const mapCurrencyData = (item: CurrencyListItem, index: number) => ({
  label: item.currency,
  value: item.currency,
})

class Count extends PureComponent<Props> {
  constructor(props: Props){
    super(props);
  }
  
  state = {
    dialogVisible: false,
  }

  componentDidMount() {
    this.props.fetchCurrency();
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
    this.setState({
      dialogVisible: !this.state.dialogVisible,
    })
  }

  _recentSelected = (param: HistoryListItem) => () => {
    this.props.selectFromHistory(param);
    this._toggleHistoryList();
  }

	render() {
    console.log(this.props.currencyHistoryList);
		return (
			<View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            Currency Converter
          </Text>
        </View>
				<View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <CurrencyPicker
              value={this.props.initialCurrency}
              pickerList={this.props.currencyList.map(mapCurrencyData)}
              onChange={this.props.initialCurrencyChange}
            />
            <CurrencyInput
              value={this.props.initialValue}
              onChange={this._setInitialValue}
              defaultValue={'0'}
              placeholder={`input amount in ${this.props.initialCurrency}`}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CurrencyPicker
              value={this.props.targetCurrency}
              pickerList={this.props.currencyList.map(mapCurrencyData)}
              onChange={this.props.targetCurrencyChange}
            />
            <CurrencyInput
              value={this.props.targetValue}
              onChange={this._setInitialValue}
              defaultValue={'0'}
              placeholder={`result amount in ${this.props.targetCurrency}`}
              editable={false}
            />
				  </View>
          <CurrencyHistory
            data={this.props.currencyHistoryList}
            visible={this.state.dialogVisible}
            onPress={this._toggleHistoryList}
            onRecentSelected={this._recentSelected}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Count)

