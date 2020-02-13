import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const Product = props => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails}/>
        <Button color={Colors.primary} title="Add To Cart" onPress={props.onAddToCart} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  detailContainer: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: 'gray'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default Product;
