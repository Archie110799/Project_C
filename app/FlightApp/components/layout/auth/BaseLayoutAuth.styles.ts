import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  container: {
    ...CommonStyles.bg__main,
    flex: 1,
  },
  content: {
    paddingHorizontal: responsive.getWidth(10),
  },
  view__logo: {
    paddingTop: responsive.getHeight(64),
    paddingBottom: responsive.getHeight(67),
    alignItems: 'center',
  },
  image: {
    height: responsive.getHeight(63),
    resizeMode: 'contain',
  },
  image__logo: {
    height: responsive.getHeight(40),
    resizeMode: 'contain',
  },
  view__title: {
    alignItems: 'center',
    marginBottom: responsive.getHeight(30),
  },
  text__title: {
    ...CommonStyles.text__bold,
    fontSize: responsive.getFont(25),
  },
});
