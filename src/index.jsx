import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ShoppingListProvider } from './context/ShoppingListProvider';

render(
  <React.StrictMode>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
