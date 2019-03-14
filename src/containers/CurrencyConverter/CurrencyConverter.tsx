import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { historyScreen } from '@src/routes';

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
    paddingTop: 80,
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
    // borderWidth: 1,
    width: defaultStyles.deviceWidth * 0.8,
    // height: defaultStyles.deviceHeight * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 30,
  },
  inputWrapperTop: {
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
  },
  recentButton: {
    padding: 12,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  recentText: {
    fontSize: 16,
    color: colors.white,
  },
});

type connectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = connectedProps;

const mapCurrencyData = (item: CurrencyListItem, index: number) => ({
  label: item.currency + " " + item.name,
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
        {/* <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            Currency Converter
          </Text>
        </View> */}
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
              onChange={this._setInitialValue}
              defaultValue={'0'}
              placeholder={`result in ${this.props.targetCurrency}`}
              editable={false}
            />
				  </View>
          <TouchableOpacity
            style={styles.recentButton}
            onPress={this._toggleHistoryList}
          >
            <Text style={styles.recentText}>
              Recent Conversion
            </Text>
          </TouchableOpacity>
          {/* <CurrencyHistory
            data={this.props.currencyHistoryList}
            visible={this.state.dialogVisible}
            onPress={this._toggleHistoryList}
            onRecentSelected={this._recentSelected}
          /> */}
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

