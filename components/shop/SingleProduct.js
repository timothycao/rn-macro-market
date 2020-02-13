import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const SingleProduct = props => {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId))

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  )
};

SingleProduct.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
}

const styles = StyleSheet.create({});

export default SingleProduct;
