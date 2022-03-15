import React  from "react";

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import ReduxThunk from 'redux-thunk';
import AppNavigator from "./navigation/AppNavigator";
import cartReducer from './store/reducers/cart';
import productsReducer  from "./store/reducers/products";
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert:true };
  },
});

const rootReducer = combineReducers({
  Products: productsReducer,
  Cart : cartReducer,
  Orders: ordersReducer,
  auth:authReducer
});

const store = createStore (rootReducer , applyMiddleware(ReduxThunk) );

export default function App (){
  return (
  <Provider store={store}>
    <AppNavigator/>
  </Provider>
  );
}