import React, {useState} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import {Styles} from './DropdownCustom.styles';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

interface IProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  data: Array<IItem>;
  zIndex?: number;
  zIndexInverse?: number;
}

interface IItem {
  label?: string | number;
  value: string | number;
}

const DropdownCustom: React.FC<IProps> = props => {
  const {placeholder, data, zIndex, zIndexInverse} = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any>(data);

  return (
    <View style={Styles.container}>
      <View style={Styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={placeholder}
          selectedItemContainerStyle={{opacity: 0.5}}
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
        />
      </View>
    </View>
  );
};

export default DropdownCustom;
