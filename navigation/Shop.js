import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsComponent from '../components/shop/Products';
import SingleProductComponent from '../components/shop/SingleProduct';
import CartComponent from '../components/shop/Cart';
import OrdersComponent from '../components/shop/Orders';
import UserProductsComponent from '../components/user/Products';
import EditProductComponent from '../components/user/EditProduct';
import Colors from '../constants/Colors';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? Colors.secondary : ''
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsComponent,
    SingleProduct: SingleProductComponent,
    Cart: CartComponent
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='md-cart'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersComponent
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='md-list'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsComponent,
    EditProduct: EditProductComponent
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='md-create'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
