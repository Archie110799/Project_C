import React, {useEffect, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {
  AppState,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  FlightManagement,
  FlightOrder,
  Main,
  OrderList,
  UserForm,
  UserList,
  UserManagement,
} from '../screens';
import {ImageSource} from '../assets/images';
import {CommonStyles} from '../utils/styles';
import BaseLayoutHome from '../components/layout/home/BaseLayoutHome';
import {t} from 'i18next';

interface IProps {
  navigation?: any;
}

const HomeStack: React.FC<IProps> = props => {
  const {navigation} = props;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const topNavigator = useMemo(
    () => [
      // Flight
      {
        name: Routes.home.list,
        title: 'List',
        component: FlightManagement,
      },
      {
        name: Routes.home.order,
        title: 'Order',
        component: FlightOrder,
      },
    ],
    [],
  );

  const userNavigator = useMemo(
    () => [
      // Flight
      {
        name: Routes.user.list,
        title: 'Quản lý người dùng',
        component: UserList,
      },
      {
        name: Routes.user.form,
        title: 'Tạo người dùng',
        component: UserForm,
      },
      {
        name: Routes.order.list,
        title: 'Quản lý chuyến bay',
        component: OrderList,
      },
    ],
    [],
  );

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerBackImageSource:
          Platform.OS === 'ios' ? undefined : ImageSource.iconBack,
      }}>
      <Stack.Screen
        name={Routes.home.tabBar}
        options={{
          headerShown: false,
        }}>
        {stackProps => (
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {...CommonStyles.bg__main},
              headerRight: () => (
                <TouchableOpacity
                  style={CommonStyles.margin__right__10}
                  onPress={() => navigation.replace(Routes.auth.login)}>
                  <Image
                    style={CommonStyles.icon__default}
                    source={ImageSource.iconLogout}
                  />
                </TouchableOpacity>
              ),
            }}>
            <Tab.Screen name={Routes.home.top}>
              {() => (
                <BaseLayoutHome title={t(Routes.home.top)} {...props}>
                  <Main {...stackProps} />
                </BaseLayoutHome>
              )}
            </Tab.Screen>
            <Tab.Screen name={Routes.user.profile}>
              {tabProps => (
                <BaseLayoutHome title={t(Routes.user.profile)} {...props}>
                  <UserManagement {...tabProps} />
                </BaseLayoutHome>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Stack.Screen>

      <Stack.Group>
        {topNavigator.map(item => (
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {...CommonStyles.bg__main},
              headerBackTitle: undefined,
              headerRight: () => (
                <TouchableOpacity
                  style={CommonStyles.margin__right__10}
                  onPress={() => navigation.navigate(Routes.auth.login)}>
                  <Image
                    style={CommonStyles.icon__default}
                    source={ImageSource.iconLogout}
                  />
                </TouchableOpacity>
              ),
            }}
            name={item.name}
            key={`stack-top-${item.name}`}>
            {stackProps => (
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View
                  style={CommonStyles.flex__1}
                  onStartShouldSetResponder={() => true}>
                  <item.component {...stackProps} />
                </View>
              </TouchableWithoutFeedback>
            )}
          </Stack.Screen>
        ))}
      </Stack.Group>

      <Stack.Group>
        {userNavigator.map(item => (
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {...CommonStyles.bg__main},
              headerBackTitle: undefined,
              headerRight: () => (
                <TouchableOpacity
                  style={CommonStyles.margin__right__10}
                  onPress={() => navigation.navigate(Routes.auth.login)}>
                  <Image
                    style={CommonStyles.icon__default}
                    source={ImageSource.iconLogout}
                  />
                </TouchableOpacity>
              ),
            }}
            name={item.name}
            key={`stack-top-${item.name}`}>
            {stackProps => (
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View
                  style={CommonStyles.flex__1}
                  onStartShouldSetResponder={() => true}>
                  <item.component {...stackProps} />
                </View>
              </TouchableWithoutFeedback>
            )}
          </Stack.Screen>
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
