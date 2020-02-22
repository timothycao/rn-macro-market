import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.titleText}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.removeButton}
          >
            <Ionicons
              name='md-trash'
              size={23}
              color='red'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: 'gray',
    fontSize: 16
  },
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  removeButton: {
    marginLeft: 20
  }
});

export default CartItem;