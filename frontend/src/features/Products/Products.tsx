import React, {useEffect} from "react";
import {Alert, AlertTitle, Grid, Typography} from "@mui/material";
import TollBarProducts from "./components/TollBarProducts/TollBarProducts";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProducts, selectProductsLauding} from "./productsSlice";
import {fetchProducts} from "./productsThunks";
import ProductCard from "./components/ProductCard/ProductCard";
import Spinner from "../../UI/components/Spinner/Spinner";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsLauding = useAppSelector(selectProductsLauding);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <Grid container>
      <Grid item width={"20%"}>
        <TollBarProducts/>
      </Grid>

      <Grid item sx={{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1,
      }}>
        {productsLauding
          ? (
            <Grid container justifyContent={"center"}>
              <Spinner/>
            </Grid>
          )
          : !products.length
            ? <Alert severity="info" sx={{ width: '100%', height: 100}}>
              <AlertTitle>Info</AlertTitle>
              <Typography variant={'h5'}>It's empty here</Typography>
            </Alert>
            : products.map((product) => {
              return <ProductCard key={product._id} product={product}/>;
            })
        }
      </Grid>
    </Grid>
  );
};

export default Products;