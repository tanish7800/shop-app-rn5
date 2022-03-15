import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, SafeAreaView,Button, View } from 'react-native';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


import ProductsOverviewScreen, { screenOptions as POSOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as PDSOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as CSOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as OSOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen,{ screenOptions as UPSOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen,{ screenOptions as EPSOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as ASOptions }  from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions} >
      
      <ProductsStackNavigator.Screen 
        name="ProductsOverview" 
        component={ProductsOverviewScreen}
        options={ POSOptions } 
        />

      <ProductsStackNavigator.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={ PDSOptions } 
        />

      <ProductsStackNavigator.Screen 
        name="Cart" 
        component={CartScreen}
        options={ CSOptions } 
        />

    </ProductsStackNavigator.Navigator>
  )
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions:{
//       drawerIcon: drawerConfig => (
//       <Ionicons 
//       name={Platform.OS === 'android'? 'md-cart' : 'ios-cart' }
//       size={23}
//       color={drawerConfig.tintColor}
//       />
//       )
//     } ,
//     defaultNavigationOptions: defaultNavOptiopns
//   }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>

      <OrdersStackNavigator.Screen 
        name="orders"
        component={OrdersScreen}
        options={ OSOptions }
      />

    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator =  createStackNavigator(
//   {
//   orders:OrdersScreen
// },
// {
//     navigationOptions:{
//       drawerIcon: drawerConfig => (
//       <Ionicons 
//       name={Platform.OS === 'android'? 'md-list' : 'ios-list' }
//       size={23}
//       color={drawerConfig.tintColor}
//       />
//       )
//     } ,
//   defaultNavigationOptions :defaultNavOptiopns
// }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions} >

      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UPSOptions}
      />

      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EPSOptions}
      />

    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptiopns
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator 
      drawerContentOptions={{activeTintColor: Colors.secondary}} 
      drawerContent={
        props =>{ 
          return (
            <View style={{flex:1 , paddingTop : 50, paddingHorizontal:15}} >
              <SafeAreaView forceInset ={{top:'always',horizontal:'never'}} >
                <DrawerItemList {...props}  />
                <Button title="Logout" color={Colors.secondary} onPress={()=> {
                  dispatch(authActions.logout());
                }}/>
              </SafeAreaView>
            </View>
          )
        }}>

      <ShopDrawerNavigator.Screen 
        name="Products"
        component={ProductsNavigator}
        options=
          {{
            drawerIcon: props => (
              <Ionicons 
                name={Platform.OS === 'android'? 'md-cart' : 'ios-cart' }
                size={23}
                color={props.color}
              />
            )
          }}
      />

      <ShopDrawerNavigator.Screen 
        name="Orders"
        component={OrdersNavigator}
        options=
          {{
            drawerIcon: props => (
              <Ionicons 
                name={Platform.OS === 'android'? 'md-list' : 'ios-list' }
                size={23}
                color={props.color}
              />
            )
          }}
      />

      <ShopDrawerNavigator.Screen 
        name="Admin"
        component={AdminNavigator}
        options=
          {{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
      />

    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator({
//   Products:ProductsNavigator,
//   Orders:OrdersNavigator,
//   Admin:AdminNavigator
// },{
//   contentOptions:{
//     activeTintColor: Colors.secondary
//   },
//   contentComponent: props =>{
//     const dispatch = useDispatch();
//     return (
//       <View style={{flex:1 , paddingTop : 20}} >
//         <SafeAreaView forceInset ={{top:'always',horizontal:'never'}} >
//           <DrawerItems {...props}  />
//           <Button title="Logout" color={Colors.secondary} onPress={()=> {
//             dispatch(authActions.logout());
//             // props.navigation.navigate('Auth');
//           }}/>
//         </SafeAreaView>
//       </View>
//     )
//   }
// });

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={ defaultNavOptions } >

      <AuthStackNavigator.Screen 
        name="Auth"
        component={AuthScreen}
        options={ASOptions}
      />

    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator({
//   Auth:AuthScreen
// },
// {
//   defaultNavigationOptions: defaultNavOptiopns
// }
// );



// const MainNavigator = createSwitchNavigator({
//   Startup:StartupScreen,
//   Auth:AuthNavigator,
//   Shop:ShopNavigator
// });

// export default createAppContainer( MainNavigator);
