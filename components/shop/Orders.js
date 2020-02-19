import React from 'react';
import { Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';

const Orders = props => {
  return <Text>ORDERS PLACEHOLDER</Text>
};

Orders.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
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
}

export default Orders;
