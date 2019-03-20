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
import { HistoryListItem, commonScreenProps } from '@src/constants/types';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

type connectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = connectedProps & commonScreenProps;

class Count extends PureComponent<Props> {
  static options() {
    return {
      topBar: {
        title: {
          text: 'Conversion History'
        },
      },
    };
  }

  constructor(props: Props){
    super(props);
  }

  _recentSelected = (param: HistoryListItem) => () => {
    this.props.selectFromHistory(param);
    Navigation.pop(this.props.componentId);
  }

	render() {
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

