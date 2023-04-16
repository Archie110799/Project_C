import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import { CommonStyles } from '../../../utils/styles';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: responsive.getWidth(10),
  },
});
