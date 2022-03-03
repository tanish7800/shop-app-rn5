import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import{Ionicons} from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import EditProductScreen from '../screens/user/EditProductScreen';


const defaultNavOtiopns = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  // headerTitleStyle: {
    
  // },
  // headerBackTitleStyle: {
    
  // },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions:{
      drawerIcon: drawerConfig => (
      <Ionicons 
      name={Platform.OS === 'android'? 'md-cart' : 'ios-cart' }
      size={23}
      color={drawerConfig.tintColor}
      />
      )
    } ,
    defaultNavigationOptions: defaultNavOtiopns
  }
);

const OrdersNavigator =  createStackNavigator(
  {
  orders:OrdersScreen
},
{
    navigationOptions:{
      drawerIcon: drawerConfig => (
      <Ionicons 
      name={Platform.OS === 'android'? 'md-list' : 'ios-list' }
      size={23}
      color={drawerConfig.tintColor}
      />
      )
    } ,
  defaultNavigationOptions :defaultNavOtiopns
}
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOtiopns
  }
);

const ShopNavigator = createDrawerNavigator({
  Products:ProductsNavigator,
  Orders:OrdersNavigator,
  Admin:AdminNavigator
},{
  contentOptions:{
    activeTintColor: Colors.secondary
  }
});

export default createAppContainer( ShopNavigator);
