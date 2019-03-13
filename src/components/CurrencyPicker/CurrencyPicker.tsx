import React, { PureComponent } from 'react';
import {
  StyleSheet,
} from 'react-native';

import PickerSelect from 'react-native-picker-select';
import colors from '@src/constants/colors';

const pickerSelectStyles = StyleSheet.create({
  inputAndroid:{
    width: 80,
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: colors.black,
  },
  inputIOS: {
    width: 80,
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: colors.black,
  },
})

class CurrencyPicker extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  _pickerRefs = React.createRef<PickerSelect>();

  render() {
    return (
      <PickerSelect
        items={this.props.pickerList}
        onValueChange={this.props.onChange}
        value={this.props.value}
        style={{...pickerSelectStyles}}
        ref={this._pickerRefs}
        useNativeAndroidPickerStyle={false}
      />
    )
  }
}

interface Props {
  value: string,
  pickerList: any,
  onChange(value: string): void,
}

export default CurrencyPicker;

