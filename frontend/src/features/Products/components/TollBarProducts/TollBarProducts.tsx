import React, {useEffect} from "react";
import {Button, Grid, Tooltip} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchCategories} from "../../../Categories/categoriesThunks";
import {selectCategories} from "../../../Categories/categoriesSlice";
import {fetchProducts, fetchProductsById} from "../../productsThunks";
import {selectBtnLauding} from "../../productsSlice";

const TollBarProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const btnLauding = useAppSelector(selectBtnLauding);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectCategory = async (id?: string) => {
    if (id) {
      await dispatch(fetchProductsById(id));
    } else {
      await dispatch(fetchProducts());
    }
  };

  return (
    <Tooltip title="Add" placement="left">
      <Grid container flexDirection={"column"} gap={1}>
        <Button
          disabled={btnLauding}
          onClick={() => selectCategory()}
        >
          All items
        </Button>
        {categories.map((item) => {
          return (
            <Button
              key={item._id}
              disabled={btnLauding}
              onClick={() => selectCategory(item._id)}
            >
              {item.categoryName}
            </Button>
          );
        })}
      </Grid>
    </Tooltip>
  );
};

export default TollBarProducts;