import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch('https://macro-mkt.firebaseio.com/products.json');

    const data = await response.json();
    const products = [];

    for (const key in data) {
      products.push(
        new Product(
          key,
          'u1',
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }

    dispatch({type: SET_PRODUCTS, products: products});
  };
}

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const response = await fetch('https://macro-mkt.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    const data = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: data.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl
    }
  };
};
