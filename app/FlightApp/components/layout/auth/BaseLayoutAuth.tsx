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
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseLayoutAuth;
