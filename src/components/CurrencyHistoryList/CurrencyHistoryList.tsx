import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '@src/constants/colors';
import { HistoryListItem } from '@src/constants/types';

const styles = StyleSheet.create({
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
  recentTitleContainer: {
    padding: 12,
    // width: 200,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
    alignItems: 'center',
  },
  recentTitleText: {
    fontSize: 20,
    color: colors.green,
  },
  recentCell: {
    padding: 12,
    // width: 200,
    borderBottomWidth: 1,
    borderBottomColor: colors.ultraLightGrey,
    alignItems: 'center',
  },
  recentCellText: {
    fontSize: 14,
    color: colors.grey,
  },
})

class CurrencyHistory extends PureComponent<Props> {
  _renderHistoryCell = () => {
    if(this.props.data.length === 0) {
      return (
        <View style={styles.recentCell}>
          <Text style={styles.recentCellText}>No Recent Conversion</Text>
        </View>
      )
    }

    return this.props.data.map((item) => {
      return(
        <TouchableOpacity
          style={styles.recentCell}
          onPress={this.props.onRecentSelected(item)}
        >
          <Text style={styles.recentCellText}>
            {item.initialCurrency} > {item.targetCurrency}
          </Text>
        </TouchableOpacity>
      )
    })
  }

  render(){
    return(
      <View>
        {this._renderHistoryCell()}

        {/* <TouchableOpacity
          style={styles.recentButton}
          onPress={this.props.onPress}
        >
          <Text style={styles.recentText}>
            Recent Conversion
          </Text>
        </TouchableOpacity>
        <Dialog
          visible={this.props.visible}
          onTouchOutside={this.props.onPress}
        >
          <DialogContent>
            <View style={styles.recentTitleContainer}>
              <Text style={styles.recentTitleText}>Recent Conversion</Text>
            </View>
            {this._renderHistoryCell()}
          </DialogContent>
        </Dialog> */}
      </View>
    )
  }
}

interface Props {
  data: Array<HistoryListItem>,
  onRecentSelected(value: any): any,
}

export default CurrencyHistory;
