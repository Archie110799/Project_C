import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../utils/styles';
import {responsive} from '../../../../utils/responsive';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    ...CommonStyles.padding__20,
  },
  text__title: {
    ...CommonStyles.text__center,
    fontSize: responsive.getFont(25),
    marginVertical: responsive.getHeight(10),
  },
});
