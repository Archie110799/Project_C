import {StyleSheet} from 'react-native';
import { CommonStyles } from '../../../../utils/styles';
import { responsive } from '../../../../utils/responsive';

export const Styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text__title:{
    ...CommonStyles.text__center,
    fontSize: responsive.getFont(25),
    marginBottom: responsive.getHeight(20)
  }
});
