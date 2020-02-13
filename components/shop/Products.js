import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Product from '../shop/Product';

const Products = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Product image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onViewDetails={() => {}} onAddToCart={() => {}} />}
    />
  );
};

export default Products;
