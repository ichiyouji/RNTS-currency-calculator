import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import { RootState, Dispatch } from '@src/redux/store';
import CurrencyHistory from '@src/components/CurrencyHistoryList/CurrencyHistoryList';
import * as utils from '@src/constants/utils';
import colors from '@src/constants/colors';
import defaultStyles from '@src/constants/defaultStyles';
import { CurrencyListItem, HistoryListItem } from '@src/constants/types';

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 80,
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
});

type connectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = connectedProps;

class Count extends PureComponent<Props> {
  constructor(props: Props){
    super(props);
  }
  

  _recentSelected = (param: HistoryListItem) => () => {
    this.props.selectFromHistory(param);
    Navigation.pop(this.props.componentId);
  }

	render() {
    console.log(this.props.currencyHistoryList);
		return (
			<View style={styles.mainContainer}>
        <CurrencyHistory
          data={this.props.currencyHistoryList}
          onRecentSelected={this._recentSelected}
        />
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

