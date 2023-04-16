/**
 * @format
 */

import {AppRegistry} from 'react-native';
import ReduxApp from './redux/index'
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import './ignoreWarnings.ts'

AppRegistry.registerComponent(appName, () => ReduxApp);
