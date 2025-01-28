import React from 'react';
import {} from 'react-native';
import {Loginroute} from './source/Login';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './source/redux';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Loginroute />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
