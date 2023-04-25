import {Link} from '@react-navigation/native';
import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {Styles} from './TextCustom.styles';

interface IProps {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children?: React.ReactNode;
  isLink?: boolean;
  to?: any;
}

const TextCustom: React.FC<IProps> = props => {
  const {style, children, numberOfLines, isLink, to} = props;
  const textProps: React.PropsWithChildren<TextProps | any> = {
    allowFontScaling: false,
    numberOfLines,
    ellipsizeMode: 'tail',
    style: [Styles.text__style, style],
  };

  return isLink ? (
    <Link to={to ?? ''} {...textProps}>
      {children}
    </Link>
  ) : (
    <Text {...textProps}>{children}</Text>
  );
};

export default TextCustom;
