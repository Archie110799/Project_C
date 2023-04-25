import {Link} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Styles} from './ButtonSubmit.styles';
import TextCustom from '../TextCustom/TextCustom';
import {t} from 'i18next';

interface IProps {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonSubmit: React.FC<IProps> = props => {
  const {style, styleText, title, disabled, onPress} = props;
  const handlePress = () => {
    Keyboard.dismiss();
    onPress && onPress();
  };
  return (
    <View style={Styles.view__press__submit}>
      <TouchableOpacity
        onPress={handlePress}
        style={[Styles.view__btn__submit, style]}>
        <TextCustom style={[Styles.text__btn__submit, styleText]}>
          {t(title) ?? title}
        </TextCustom>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSubmit;
