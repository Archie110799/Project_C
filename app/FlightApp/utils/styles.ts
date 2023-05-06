import {StyleSheet} from 'react-native';
import {responsive} from './responsive';

export const CommonStyles = StyleSheet.create({
  bg__main: {
    backgroundColor: '#93D9F8',
  },
  bg__white: {
    backgroundColor: '#FFFFFF',
  },
  color__main: {
    color: '#93D9F8',
  },
  color__white: {
    color: '#FFFFFF',
  },
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
  text__font__30: {
    fontSize: responsive.getFont(30),
  },
  text__font__20: {
    fontSize: responsive.getFont(20),
  },
  text__font__14: {
    fontSize: responsive.getFont(14),
  },
  text__bold: {
    fontWeight: '700',
  },
  text__danger: {
    color: 'red',
  },
  text__link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  text__normal: {
    color: '#333333',
  },
  text__center: {
    textAlign: 'center',
  },
  content__center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin__top__20: {
    marginTop: responsive.getHeight(20),
  },
  margin__top__10: {
    marginTop: responsive.getHeight(10),
  },
  margin__top__5: {
    marginTop: responsive.getHeight(5),
  },
  margin__bottom__20: {
    marginBottom: responsive.getHeight(20),
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
  margin__horizontal__20: {
    marginHorizontal: responsive.getWidth(20),
  },
  margin__horizontal__10: {
    marginHorizontal: responsive.getWidth(10),
  },
  margin__horizontal__5: {
    marginHorizontal: responsive.getWidth(5),
  },
  padding__10: {
    padding: responsive.getHeight(10),
  },
  padding__20: {
    padding: responsive.getHeight(20),
  },
  padding__vertical__20: {
    paddingVertical: responsive.getHeight(20),
  },
  padding__vertical__10: {
    paddingVertical: responsive.getHeight(10),
  },
  padding__vertical__5: {
    paddingVertical: responsive.getHeight(5),
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
  view__circle__border: {
    borderWidth: 10,
    borderColor: '#FFFFFF',
    borderRadius: responsive.getWidth(100),
    shadowColor: '#333333',
    // IOS
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    // Anroid
    // elevation: 5,
  },
  image__circle__xl: {
    resizeMode: 'contain',
    width: responsive.getWidth(200),
    height: responsive.getWidth(200),
  },
  icon__default: {
    resizeMode: 'contain',
    width: responsive.getWidth(20),
    height: responsive.getWidth(20),
  },
  border__gray: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: responsive.getHeight(10),
  },
  border__white: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: responsive.getHeight(10),
  },
  border__main: {
    borderColor: '#93D9F8',
    borderWidth: 1,
    borderRadius: responsive.getWidth(5),
  },
  border__danger: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: responsive.getWidth(5),
  },
  justifyContent__spaceEvenly: {
    justifyContent: 'space-evenly',
  },
});
