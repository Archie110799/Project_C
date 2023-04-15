import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    marginBottom: 20,
    minHeight: responsive.getHeight(150),
  },
});
