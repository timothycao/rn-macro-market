import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Product from '../shop/Product';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/Colors';

const Products = props => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(productsActions.fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('SingleProduct', {
      productId: id,
      productTitle: title
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>There are no products listed.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Product
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </Product>
      )}
    />
  );
};

Products.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='md-menu'
          onPress={() => {navData.navigation.toggleDrawer()}}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='md-cart'
          onPress={() => {navData.navigation.navigate('Cart')}}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Products;
