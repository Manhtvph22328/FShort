import React from 'react';
import NavigationContainerComponent from './src/navigation/NavigationContainer';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

const App = () => {
  return (
      <Provider store={store}>
          <NavigationContainerComponent />
      </Provider>
  );
};

export default App;
