import {ProductApi} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {postProduct} from "./productsThunks";

interface ProductsSlice {
  products: ProductApi[],
  productsLauding: boolean,
  btnLauding: boolean,
}

const initialState: ProductsSlice = {
  products: [],
  productsLauding: false,
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
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLauding = (state: RootState) => state.products.productsLauding;
export const selectBtnLauding = (state: RootState) => state.products.btnLauding;
