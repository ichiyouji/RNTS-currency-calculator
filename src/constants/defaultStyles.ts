import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  deviceWidth: width,
  deviceHeight: height,
}
