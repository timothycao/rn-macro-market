import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, Button, SafeAreaView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ProductsComponent from '../components/shop/Products';
import SingleProductComponent from '../components/shop/SingleProduct';
import CartComponent from '../components/shop/Cart';
import OrdersComponent from '../components/shop/Orders';
import UserProductsComponent from '../components/user/Products';
import EditProductComponent from '../components/user/EditProduct';
import AuthComponent from '../components/user/Auth';
import StartComponent from '../components/Start';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

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
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      )
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthComponent
});

const MainNavigator = createSwitchNavigator({
  Start: StartComponent,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
