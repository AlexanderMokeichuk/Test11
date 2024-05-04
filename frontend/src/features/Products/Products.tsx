import React from "react";
import {Grid} from "@mui/material";
import TollBarProducts from "./components/TollBarProducts/TollBarProducts";

const Products: React.FC = () => {
  return (
    <Grid container>
      <Grid item>
        <TollBarProducts />
      </Grid>
    </Grid>
  );
};

export default Products;