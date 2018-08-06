/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Setup from './js/pages/Setup'
import HomePage from './js/pages/HomePage'

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Setup);
// AppRegistry.registerComponent(appName, () => HomePage);
