import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {t} from 'i18next';
import BaseLayoutAuth from '../components/layout/auth/BaseLayoutAuth';
import {Login, Main, Register} from '../screens';
import HomeStack from './HomeStack';

const authNavigator = [
  {
    name: Routes.auth.login,
    title: 'Login Screen',
    component: Login,
  },
  {
    name: Routes.auth.register,
    title: 'Register Screen',
    component: Register,
  },
];

const homeNavigator = [
  {
    name: Routes.home.main,
    title: 'Home Screen',
    component: Main,
  },
];

const AppStack: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        orientation: 'portrait',
      }}
      initialRouteName={Routes.auth.login}>
      {/* Stack Auth */}
      <Stack.Group>
        {authNavigator.map(item => (
          <Stack.Screen name={item.name} key={`stack-auth-${item.name}`}>
            {props => (
              <BaseLayoutAuth title={t(item.title)} {...props}>
                <item.component {...props} />
              </BaseLayoutAuth>
            )}
          </Stack.Screen>
        ))}
      </Stack.Group>

      {/* Stack Home */}
      <Stack.Screen name={Routes.home.main}>
        {stackProps => <HomeStack {...stackProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default AppStack;
