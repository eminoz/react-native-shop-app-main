import Product from "../../model/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/product";

const initialState = {
  avaibleProducts: [],
  userProduct: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        avaibleProducts: action.products,
        userProduct: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        avaibleProducts: state.avaibleProducts.concat(newProduct),
        userProduct: state.userProduct.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProduct[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProduct[productIndex].price
      );
      const updatedUserProduct = [...state.userProduct];
      updatedUserProduct[productIndex] = updatedProduct;
      const avaibleProductIndex = state.avaibleProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedAvaibleProducts = [...state.avaibleProducts];
      updatedAvaibleProducts[avaibleProductIndex] = updatedProduct;
      return {
        ...state,
        avaibleProducts: updatedAvaibleProducts,
        userProduct: updatedUserProduct,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProduct: state.userProduct.filter(
          (product) => product.id !== action.pid
        ),
        avaibleProducts: state.avaibleProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
