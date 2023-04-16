import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  view__input: {
    marginBottom: responsive.getHeight(10),
  },
  lable__style: {
    fontSize: responsive.getFont(18),
    marginBottom: responsive.getHeight(5),
  },
  text__style: {
    flex: 1,
    fontSize: responsive.getFont(16),
    color: '#333333',
    paddingHorizontal: responsive.getWidth(15),
    paddingVertical: responsive.getWidth(10),
  },
  icon: {
    width: responsive.getWidth(15),
    height: responsive.getWidth(15),
    marginRight: responsive.getWidth(15),
  },
});
