// index.js
import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';


const Root = () => (
      <App />
);

AppRegistry.registerComponent(appName, () => Root);
