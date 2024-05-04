import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ProductApi} from "../../type";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

export const postProduct = createAsyncThunk<void, Product, { state: RootState }>(
  "products/postProduct",
  async (product, {getState}) => {
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof Product)[];
    keys.forEach((key) => {
      const value = product[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const token = getState().users.user?.token;

      await axiosApi.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchProducts = createAsyncThunk<ProductApi[], undefined>(
  "products/fetchProducts",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/products");
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);

export const fetchProductsById = createAsyncThunk<ProductApi[], string>(
  "products/fetchProductsById",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/products/${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);