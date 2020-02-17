import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsComponent from '../components/shop/Products';
import SingleProductComponent from '../components/shop/SingleProduct';
import CartComponent from '../components/shop/Cart';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsComponent,
    SingleProduct: SingleProductComponent,
    Cart: CartComponent
  },
  {
    defaultNavigationOptions: {
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
    }
  }
);

export default createAppContainer(ProductsNavigator);
