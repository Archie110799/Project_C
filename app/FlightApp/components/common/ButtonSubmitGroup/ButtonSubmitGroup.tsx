import React from 'react';
import {
  Keyboard,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Styles} from './ButtonSubmitGroup.styles';
import TextCustom from '../TextCustom/TextCustom';
import {t} from 'i18next';
import {CommonStyles} from '../../../utils/styles';

interface IProps {
  style?: Array<StyleProp<ViewStyle>>;
  styleText?: Array<StyleProp<TextStyle>>;
  title: Array<string>;
  onPress?: Array<() => void>;
  disabled?: boolean;
}

const ButtonSubmitGroup: React.FC<IProps> = props => {
  const {style, styleText, title, disabled, onPress} = props;
  const handlePress = (index: number) => {
    Keyboard.dismiss();
    onPress && onPress[index]();
  };
  return (
    <View style={[CommonStyles.flex__row, CommonStyles.content__center]}>
      {title?.map((text, index) => (
        <View
          style={Styles.view__press__submit}
          key={`btn-gr-${text}-${new Date()}`}>
          <TouchableOpacity
            onPress={() => handlePress(index)}
            style={[Styles.view__btn__submit, style && style[index]]}>
            <TextCustom
              style={[Styles.text__btn__submit, styleText && styleText[index]]}>
              {t(text) ?? text}
            </TextCustom>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ButtonSubmitGroup;
