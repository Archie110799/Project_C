import React, {useState} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import {Styles} from './CheckboxCustom.styles';
import CheckBox from 'react-native-check-box';

interface IProps {
  style?: StyleProp<TextStyle>;
  title?: string;
  checked?: boolean;
  onClick?: () => void;
}

const CheckboxCustom: React.FC<IProps> = props => {
  const {title, checked = false, onClick} = props;

  return (
    <View style={Styles.container}>
      <View style={Styles.checkboxContainer}>
        <CheckBox
          style={Styles.checkbox}
          onClick={() => {
            onClick && onClick();
          }}
          isChecked={checked}
          leftText={'CheckBox'}
        />
        <Text style={Styles.label}>{title}</Text>
      </View>
    </View>
  );
};

export default CheckboxCustom;
