import React, { Component } from 'react'
import store from './configureStore'
import { Provider } from 'react-redux'

import Order from './components/Order'
import Cart from './components/Cart'

const App = (props) => {
  return (
    <div>
      <Order />
      <Cart />
    </div>
  );
}

export default App;
