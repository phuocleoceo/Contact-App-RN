import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './Navigation';
import React from 'react';

export default function App()
{
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
