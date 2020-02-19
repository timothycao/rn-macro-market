import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

import ProductsComponent from '../components/shop/Products';
import SingleProductComponent from '../components/shop/SingleProduct';
import CartComponent from '../components/shop/Cart';
import OrdersComponent from '../components/shop/Orders';
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
    defaultNavigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersComponent
  },
  {
    defaultNavigationOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
