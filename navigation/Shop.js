import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsComponent from '../components/shop/Products';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsComponent
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? Colors.secondary : ''
    }
  }
);

export default createAppContainer(ProductsNavigator);
