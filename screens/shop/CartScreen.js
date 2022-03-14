import React ,{useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet ,ActivityIndicator } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../component/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';
import Card from '../../component/UI/Card';


const CartScreen = props => {

  const [isLoading,setIsLoading] = useState (false);

  const cartTotalAmount = useSelector(state => state.Cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.Cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.Cart.items[key].productTitle,
        productPrice: state.Cart.items[key].productPrice,
        quantity: state.Cart.items[key].quantity,
        sum: state.Cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a,b)=>a.productId > b.productId ? 1 : -1);
  });

  const dispatch =useDispatch();

  const sendOrderHandler = async ()=>{
    setIsLoading(true);

   await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  }


  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
        </Text>
        {isLoading ? (<ActivityIndicator size='small' color={Colors.secondary} />):(
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress ={sendOrderHandler}
        /> 
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch( cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />

    </View>
  );
};

export const screenOptions = {
  headerTitle:'Your Cart'
}; 


const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
