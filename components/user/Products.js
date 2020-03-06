import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Product from '../../components/shop/Product';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProducts = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id});
  };

  const deleteProductHandler = (id) => {
    Alert.alert('Warning', 'Are you sure you want to delete this product?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes', style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        }
      }
    ])
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Product
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteProductHandler.bind(this, itemData.item.id)}
          />
        </Product>
      )}
    />
  )
};

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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
          title='Add'
          iconName='md-create'
          onPress={() => {navData.navigation.navigate('EditProduct')}}
        />
      </HeaderButtons>
    )
  }
};

export default UserProducts;
