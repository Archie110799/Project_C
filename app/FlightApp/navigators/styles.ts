import {StyleSheet} from 'react-native';
import {responsive} from '../utils/responsive';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header__employee: {
    backgroundColor: '#4D4790',
  },
  header__broker: {
    backgroundColor: '#79A6A9',
  },
  text__header: {
    flex: 1,
    fontSize: responsive.getFont(20),
    lineHeight: responsive.getFont(24),
  },
  container__userStack: {
    flex: 1,
  },
  wrapper__userStack: {
    flex: 1,
    paddingHorizontal: responsive.getWidth(30),
    paddingVertical: responsive.getHeight(40),
  },
});
