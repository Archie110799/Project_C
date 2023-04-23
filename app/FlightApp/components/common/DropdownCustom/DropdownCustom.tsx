import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Styles} from './DropdownCustom.styles';
import SelectDropdown from 'react-native-select-dropdown';
import {CommonStyles} from '../../../utils/styles';
import TextCustom from '../TextCustom/TextCustom';
import {t} from 'i18next';

interface IProps {
  style?: StyleProp<TextStyle>;
  title?: string;
  data: any;
  onSelect: (selectedItem: any, index: number) => void;
  defaultValue?: any;
  buttonTextAfterSelection: (selectedItem: any, index: number) => any;
  rowTextForSelection: (item: any, index: number) => any;
  dropdownStyle?: StyleProp<ViewStyle>;
}

const DropdownCustom: React.FC<IProps> = props => {
  const {
    title,
    data,
    defaultValue,
    onSelect,
    buttonTextAfterSelection,
    rowTextForSelection,
    dropdownStyle,
  } = props;
  return (
    <View style={Styles.container}>
      {title && (
        <TextCustom
          style={[CommonStyles.flex__1, CommonStyles.margin__bottom__10]}>
          {t(title) ?? title}
        </TextCustom>
      )}
      <View style={Styles.dropdownContainer}>
        <SelectDropdown
          buttonStyle={Styles.btn__dropdown__styles}
          dropdownStyle={dropdownStyle}
          data={data}
          defaultValue={defaultValue}
          onSelect={onSelect}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
        />
      </View>
    </View>
  );
};

export default DropdownCustom;
