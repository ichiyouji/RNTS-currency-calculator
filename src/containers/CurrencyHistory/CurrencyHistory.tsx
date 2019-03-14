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
    flex: 1,
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
  currencyHistoryList: state.history.currencyHistoryList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectFromHistory: (param: any) => dispatch.history.selectFromHistory(param),
});

export default connect(mapStateToProps, mapDispatchToProps)(Count)

