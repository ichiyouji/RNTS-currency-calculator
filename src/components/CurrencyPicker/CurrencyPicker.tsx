import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Modal,
} from 'react-native';

import colors from '@src/constants/colors';
import defaultStyles from '@src/constants/defaultStyles';

const styles = StyleSheet.create({
  pickerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  pickerButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  pickerStyle: {
    // height: 300,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalSpacer: {
    flex: 1,
  },
  modalContent: {
    // borderWidth: 2,
    // borderColor: colors.green,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // height: 280,
    height: defaultStyles.deviceHeight/2,
    justifyContent: 'center',
    backgroundColor: colors.ultraLightGrey,
  },
})

class CurrencyPicker extends PureComponent<Props, State> {
  static defaultProps = {
    style: {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      showPicker: false,
      selectedItem: {},
    }
  }

  _togglePicker = () => {
    this.setState({
      showPicker: !this.state.showPicker,
    })
  }

  _renderItems = () => {
    return this.props.pickerList.map((item) => (
      <Picker.Item
        label={item.label}
        value={item.value}
        key={item.label}
        color={colors.green}
      />
    ))
  }

  _onChange = (value: string, index: number) => {
    const { onChange } = this.props;

    onChange(value);

    const selectedItem = this.props.pickerList[index];

    this.setState({
      selectedItem: selectedItem,
    });
  }

  render() {
    const { style } = this.props;

    return (
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={[styles.pickerButton, style.buttonStyle]}
          onPress={this._togglePicker}
        >
          <Text style={styles.pickerButtonText}>{this.props.defaultCurrency}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.showPicker}
          transparent
          animationType='slide'
        >
          <TouchableOpacity
            style={styles.modalSpacer}
            onPress={this._togglePicker}
          />
          <View style={styles.modalContent}>
            <Picker
              onValueChange={this._onChange}
              selectedValue={this.state.selectedItem.value || this.props.defaultCurrency}
              style={styles.pickerStyle}
            >
              {this._renderItems()}
            </Picker>
          </View>
        </Modal>
      </View>
    )
  }
}

interface listItem {
  label: string
  value: string
}

interface Props {
  defaultCurrency: string
  value: string
  pickerList: Array<listItem>
  style: any
  onChange(value: string): void
}

interface State {
  showPicker: boolean
  selectedItem: any
};

export default CurrencyPicker;

