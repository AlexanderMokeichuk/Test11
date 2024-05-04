import React, {useEffect} from "react";
import {Button, Grid, Tooltip} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchCategories} from "../../../Categories/categoriesThunks";
import {selectCategories} from "../../../Categories/categoriesSlice";

const TollBarProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Tooltip title="Add" placement="left">
      <Grid container flexDirection={"column"} gap={1}>
        {categories.map((item) => {
          return <Button key={item._id}>{item.categoryName}</Button>;
        })}
      </Grid>
    </Tooltip>
  );
};

export default TollBarProducts;