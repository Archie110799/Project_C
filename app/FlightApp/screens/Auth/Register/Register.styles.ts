import {StyleSheet} from 'react-native';
import {responsive} from '../../../utils/responsive';
import {CommonStyles} from '../../../utils/styles';

export const Styles = StyleSheet.create({
  container: {
    padding: responsive.getWidth(30),
    ...CommonStyles.border__white,
    backgroundColor:'#FFFFFF'
  },
  text__title:{
    ...CommonStyles.text__center,
    fontSize: responsive.getFont(25),
    marginBottom: responsive.getHeight(20)
  },
  btn__submmit:{
    ...CommonStyles.text__bold, 
    ...CommonStyles.text__font__20
  },
  btn__cancel:{
    backgroundColor:'#d7edee'
  }
});
