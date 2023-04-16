import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text__title: {
    ...CommonStyles.text__center,
    fontSize: responsive.getFont(25),
    marginBottom: responsive.getHeight(20),
  },
});
