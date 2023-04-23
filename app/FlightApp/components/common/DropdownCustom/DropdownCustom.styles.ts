import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  btn__dropdown__styles: {
    width: '100%',
    ...CommonStyles.border__main,
    ...CommonStyles.bg__main,
  },
});
