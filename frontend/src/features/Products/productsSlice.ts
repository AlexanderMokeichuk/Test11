import {FullProduct, ProductApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchFullProduct, fetchProducts, fetchProductsById, postProduct} from "./productsThunks";

interface ProductsSlice {
  products: ProductApi[],
  product: FullProduct | null,
  productsLauding: boolean,
  productLauding: boolean,
  btnLauding: boolean,
}

const initialState: ProductsSlice = {
  products: [],
  product: null,
  productsLauding: false,
  productLauding: false,
  btnLauding: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postProduct.pending, (state) => {
      state.btnLauding = true;
    }).addCase(postProduct.fulfilled, (state) => {
      state.btnLauding = false;
    }).addCase(postProduct.rejected, (state) => {
      state.btnLauding = false;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLauding = true;
    }).addCase(fetchProducts.fulfilled, (state, {payload: products}: PayloadAction<ProductApi[]>) => {
      state.products = products;
      state.productsLauding = false;
    }).addCase(fetchProducts.rejected, (state) => {
      state.productsLauding = false;
    });

    builder.addCase(fetchProductsById.pending, (state) => {
      state.productsLauding = true;
      state.btnLauding = true;
    }).addCase(fetchProductsById.fulfilled, (state, {payload: products}: PayloadAction<ProductApi[]>) => {
      state.products = products;
      state.productsLauding = false;
      state.btnLauding = false;
    }).addCase(fetchProductsById.rejected, (state) => {
      state.productsLauding = false;
      state.btnLauding = true;
    });

    builder.addCase(fetchFullProduct.pending, (state) => {
      state.productLauding = true;
    }).addCase(fetchFullProduct.fulfilled, (state, {payload: product}: PayloadAction<FullProduct | null>) => {
      state.product = product;
      state.productLauding = false;
    }).addCase(fetchFullProduct.rejected, (state) => {
      state.productLauding = true;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;

export const selectProductsLauding = (state: RootState) => state.products.productsLauding;
export const selectProductLauding = (state: RootState) => state.products.productLauding;

export const selectBtnLauding = (state: RootState) => state.products.btnLauding;
