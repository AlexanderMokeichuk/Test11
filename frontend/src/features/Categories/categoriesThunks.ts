import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category} from "../../type";
import axiosApi from "../../axiosApi";

export const fetchCategories = createAsyncThunk<Category[], undefined>(
  "categories/fetchCategories",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/categories");

      return response;
    } catch (e) {
      return [];
    }
  },
);