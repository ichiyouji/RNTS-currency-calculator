import React from 'react';

import {
  StyleSheet,
  TextInput
} from 'react-native';

import colors from '@src/constants/colors';

const styles = StyleSheet.create({
  textInputStyle: {
    flexGrow: 1,
    fontSize: 32,
    color: colors.black,
    textAlign: 'right',
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.green,
  },
  disabledTextInputStyle: {
    flexGrow: 1,
    fontSize: 32,
    color: colors.grey,
    textAlign: 'right',
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.grey,
  }
})

const CurrencyInput = (props: Props) => (
  <TextInput
    editable={props.editable}
    style={props.editable ? styles.textInputStyle : styles.disabledTextInputStyle}
    value={props.value}
    onChangeText={props.onChange}
    keyboardType={'numeric'}
    defaultValue={props.defaultValue}
    placeholder={props.placeholder}
  />
)

interface Props {
  value?: string,
  defaultValue: string,
  placeholder: string,
  editable?: boolean,
  onChange(value: string): void,
}

CurrencyInput.defaultProps = {
  editable: true,
};

export default CurrencyInput;

