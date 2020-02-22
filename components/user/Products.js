import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Product from '../../components/shop/Product';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/Colors';

const UserProducts = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Product
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {

            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {

            }}
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
    )
  }
};

export default UserProducts;
