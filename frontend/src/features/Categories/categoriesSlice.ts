import {Category} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchCategories} from "./categoriesThunks";

interface CategoriesSlice {
  categories: Category[],
}

const initialState: CategoriesSlice = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}: PayloadAction<Category[]>) => {
      state.categories = categories;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;