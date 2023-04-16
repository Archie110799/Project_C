import React, {ReactNode, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Styles} from './BaseLayoutAuth.styles';
import {ImageSource} from '../../../assets/images';
import {CommonStyles} from '../../../utils/styles';

interface IProps {
  children: ReactNode;
  title?: string | null;
  route?: any;
}

const BaseLayoutAuth: React.FC<IProps> = props => {
  const {children, route} = props;
  return (
    <SafeAreaView style={Styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView style={Styles.content} alwaysBounceVertical={false}>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.margin__vertical__20,
            ]}>
            <View
              style={[
                CommonStyles.content__center,
                CommonStyles.view__circle__border,
              ]}>
              <Image
                style={[
                  CommonStyles.view__circle__border,
                  CommonStyles.image__circle__xl,
                ]}
                source={ImageSource.imageLogo}
              />
            </View>
          </View>

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseLayoutAuth;
