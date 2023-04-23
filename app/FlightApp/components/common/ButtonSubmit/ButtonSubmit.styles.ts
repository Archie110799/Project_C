import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  view__press__submit: {
    ...CommonStyles.content__center,
  },
  view__btn__submit: {
    ...CommonStyles.bg__main,
    ...CommonStyles.border__main,
    padding: responsive.getHeight(10),
    width: responsive.getWidth(120),
  },
  text__btn__submit: {
    fontSize: responsive.getFont(16),
    color: '#00233A',
    textAlign: 'center',
  },
});
