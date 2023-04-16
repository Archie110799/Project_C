import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Styles} from './InputDatePicker.styles';
import {CommonStyles} from '../../../utils/styles';
import {t} from 'i18next';
import {ImageSource} from '../../../assets/images';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../../../utils/date';
import TextCustom from '../TextCustom/TextCustom';

interface IProps {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleLabel?: StyleProp<TextStyle>;
  lable?: string;
  value?: Date;
  disabled?: boolean;
  error?: string;
  onChange?: (date: Date) => void;
}

const InputDatePicker: React.FC<IProps> = props => {
  const {style, value = new Date(), lable, disabled, onChange} = props;
  const [open, setOpen] = useState(false);

  const handleConfirm = (date: Date) => {
    setOpen(false);
    onChange && onChange(date);
  };

  const handlePicker = () => {
    console.log('handlePicker');
    setOpen(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[Styles.view__input, style]}>
        <TouchableOpacity disabled={disabled} onPress={handlePicker}>
          {lable && (
            <TextCustom
              style={[CommonStyles.flex__1, CommonStyles.margin__bottom__10]}>
              {t(lable) ?? lable}
            </TextCustom>
          )}
          <View style={[Styles.input__view]}>
            <TextInput
              editable={false}
              style={CommonStyles.flex__1}
              defaultValue={formatDate(value)}
            />
            <Image style={Styles.icon} source={ImageSource.iconLogout} />
          </View>
        </TouchableOpacity>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={value}
          onConfirm={handleConfirm}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputDatePicker;
