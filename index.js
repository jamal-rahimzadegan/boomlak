
import {YellowBox} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
AppRegistry.registerComponent(appName, () => App);
