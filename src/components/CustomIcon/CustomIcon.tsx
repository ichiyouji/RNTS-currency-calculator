import React, { PureComponent } from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '@src/constants/colors';

class CustomIcon extends PureComponent<Props> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon name={this.props.name} color={this.props.colors || colors.grey} size={this.props.size || 20}/>
      </TouchableOpacity>
    );
  }
}

interface Props {
  onPress(): void,
  name: string,
  colors?: string,
  size?: number,
}

export default CustomIcon