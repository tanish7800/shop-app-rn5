import React from "react";
import {Text , View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';

import ReduxThunk from 'redux-thunk';
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from './store/reducers/cart';
import productsReducer  from "./store/reducers/products";
import ordersReducer from './store/reducers/order';


const rootReducer = combineReducers({
  Products: productsReducer,
  Cart : cartReducer,
  Orders: ordersReducer
});

const store = createStore (rootReducer , applyMiddleware(ReduxThunk) );

export default function App (){
  return (
  <Provider store={store}>
    <ShopNavigator/>
  </Provider>
  );
}