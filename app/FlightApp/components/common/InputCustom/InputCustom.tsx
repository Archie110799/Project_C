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
import TextCustom from '../TextCustom/TextCustom';
import {Styles} from './InputCustom.styles';
import {CommonStyles} from '../../../utils/styles';
import {t} from 'i18next';
import {blockEmojiText} from '../../../utils/helper';
import {ImageSource} from '../../../assets/images';

interface IProps {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleLabel?: StyleProp<TextStyle>;
  lable?: string;
  value?: string;
  placeholder?: string | undefined;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  keyboardType?:
    | 'numeric'
    | 'default'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
  type?: 'default' | 'password';
}

const InputCustom: React.FC<IProps> = props => {
  const {
    style,
    styleText,
    lable,
    styleLabel,
    isRequired = false,
    value,
    placeholder,
    disabled,
    keyboardType = 'default',
    maxLength = 255,
    onChangeText,
    onBlur,
    type = 'default',
    error,
  } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  const handeChange = (newValue: string | undefined) => {
    if (newValue) {
      newValue = blockEmojiText(newValue);
    }
    onChangeText && onChangeText(newValue ?? '');
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[Styles.view__input, style]}>
        {lable && (
          <TextCustom style={[Styles.lable__style, styleLabel]}>
            {t(lable) ?? lable}
            {isRequired && (
              <TextCustom style={CommonStyles.text__danger}> *</TextCustom>
            )}
          </TextCustom>
        )}
        <View
          style={[
            CommonStyles.flex__row,
            CommonStyles.border__main,
            CommonStyles.content__center,
          ]}>
          <TextInput
            style={[Styles.text__style, styleText]}
            allowFontScaling={false}
            autoCorrect={false}
            placeholder={t(placeholder ?? '') ?? placeholder}
            value={value}
            editable={!disabled}
            autoFocus={false}
            maxLength={maxLength}
            caretHidden={false}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onBlur={handleOnBlur}
            onChangeText={handeChange}
          />
          {type === 'password' && (
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Image
                style={Styles.icon}
                source={
                  secureTextEntry
                    ? ImageSource.iconShowPwd
                    : ImageSource.iconHidePwd
                }
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <TextCustom style={CommonStyles.text__danger}>{error}</TextCustom>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputCustom;
