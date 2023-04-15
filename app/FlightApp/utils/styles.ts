import {StyleSheet} from 'react-native';
import {responsive} from './responsive';

export const CommonStyles = StyleSheet.create({
  flex__row: {
    flexDirection: 'row',
  },
  flex__1: {
    flex: 1,
  },
  flex__05: {
    flex: 0.5,
  },
  flex__03: {
    flex: 0.3,
  },
  text__bold: {
    fontWeight: '700',
  },
  text__danger: {
    color: 'red',
  },
  text__center: {
    textAlign: 'center',
  },
  content__center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  border__default: {
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: responsive.getWidth(5),
  },
  border__danger: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: responsive.getWidth(5),
  },
  margin__top__10: {
    marginTop: responsive.getHeight(10),
  },
  margin__top__5: {
    marginTop: responsive.getHeight(5),
  },
  margin__bottom__10: {
    marginBottom: responsive.getHeight(10),
  },
  margin__bottom__5: {
    marginBottom: responsive.getHeight(5),
  },
  margin__left__10: {
    marginLeft: responsive.getHeight(10),
  },
  margin__left__5: {
    marginLeft: responsive.getHeight(5),
  },
  margin__right__10: {
    marginRight: responsive.getHeight(10),
  },
  margin__right__5: {
    marginRight: responsive.getHeight(5),
  },
  margin__vertical__20: {
    marginVertical: responsive.getHeight(20),
  },
  margin__vertical__10: {
    marginVertical: responsive.getHeight(10),
  },
  margin__vertical__5: {
    marginVertical: responsive.getHeight(5),
  },
  padding__horizontal__20: {
    paddingHorizontal: responsive.getWidth(20),
  },
  padding__horizontal__10: {
    paddingHorizontal: responsive.getWidth(10),
  },
  padding__horizontal__5: {
    paddingHorizontal: responsive.getWidth(5),
  },
  height__500: {
    height: responsive.getHeight(500),
  },
});
