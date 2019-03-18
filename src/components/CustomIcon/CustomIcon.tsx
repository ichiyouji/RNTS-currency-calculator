import React, { PureComponent } from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '@src/constants/colors';

const CustomIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon name="history" color={colors.green} size={24}/>
    </TouchableOpacity>
  );
}

export default CustomIcon