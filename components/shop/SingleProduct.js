import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Color from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const SingleProduct = props => {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId))
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.buttonContainer}>
        <Button color={Color.primary} title="Add To Cart" onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
};

SingleProduct.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default SingleProduct;
