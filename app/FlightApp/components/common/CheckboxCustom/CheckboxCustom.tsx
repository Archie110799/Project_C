import React, {useState} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import {Styles} from './CheckboxCustom.styles';
import CheckBox from 'react-native-check-box';

interface IProps {
  style?: StyleProp<TextStyle>;
  title?: string;
}

const CheckboxCustom: React.FC<IProps> = props => {
  const {title} = props;
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={Styles.container}>
      <View style={Styles.checkboxContainer}>
        <CheckBox
          style={Styles.checkbox}
          onClick={() => {
            setSelection(prev => !prev);
          }}
          isChecked={isSelected}
          leftText={'CheckBox'}
        />
        <Text style={Styles.label}>{title}</Text>
      </View>
    </View>
  );
};

export default CheckboxCustom;
