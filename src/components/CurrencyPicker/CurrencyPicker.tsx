import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Picker,
  Modal,
} from 'react-native';

import PickerSelect from 'react-native-picker-select';
import colors from '@src/constants/colors';

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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 280,
    justifyContent: 'center',
    backgroundColor: colors.green,
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

  _pickerRefs = React.createRef<PickerSelect>();

  _togglePicker = () => {
    this.setState({
      showPicker: !this.state.showPicker,
    })
  }

  _renderItems = () => {
    return this.props.pickerList.map((item: any) => (
      <Picker.Item
        label={item.label}
        value={item.value}
        key={item.label}
        color={colors.white}
      />
    ))
  }

  _onChange = (value:any, index:number) => {
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

interface Props {
  defaultCurrency: string
  value: string
  pickerList: any
  style: any
  onChange(value: string): void
}

interface State {
  showPicker: boolean
  selectedItem: any
};

export default CurrencyPicker;

