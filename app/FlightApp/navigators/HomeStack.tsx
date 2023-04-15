import React, {useEffect, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {Text, TouchableOpacity, View} from 'react-native';
import {Main} from '../screens';

interface IProps {
  navigation?: any;
}

const HomeStack: React.FC<IProps> = props => {
  const {navigation} = props;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Stack.Screen
      name={Routes.home.main}
      options={{
        headerShown: false,
      }}>
      {stackProps => (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen name={Routes.home.main}>
            {() => <Main {...stackProps} />}
          </Tab.Screen>
          <Tab.Screen name={Routes.user.profile}>
            {tabProps => <Main {...tabProps} />}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </Stack.Screen>
  );
};

export default HomeStack;
