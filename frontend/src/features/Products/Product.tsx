import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProduct, selectProductLauding} from "./productsSlice";
import {deleteProduct, fetchFullProduct, fetchProducts} from "./productsThunks";
import Spinner from "../../UI/components/Spinner/Spinner";
import {Button, Grid, Typography} from "@mui/material";
import noImage from "../../../public/noimage.svg";
import {API_URL} from "../../constants";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import {selectUser} from "../Users/usersSlice";

const Product: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const productLauding = useAppSelector(selectProductLauding);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (id) {
      dispatch(fetchFullProduct(id));
    } else {
      navigate("/");
    }
  }, [id, dispatch, navigate]);

  let image = noImage;

  if (product) {
    if (product.image) {
      image = API_URL + "/" + product.image;
    }
  }

  const deleteProductApi = async (id: string) => {
    await dispatch(deleteProduct(id));
    navigate("/");
    await dispatch(fetchProducts());
  };

  let btnDelete = <></>;

  if (user?._id === product?.user._id) {
    btnDelete = (
      <Button
        type={"button"}
        variant="outlined"
        color="error"
        sx={{marginLeft: "auto"}}

        onClick={() => deleteProductApi(product!._id)}
      >
        Delete
      </Button>
    );
  }

  return (
    <>
      {!product || productLauding
        ? (
          <Grid container justifyContent={"center"}>
            <Spinner/>
          </Grid>
        )
        : (
          <Grid container gap={3}>
            <Card sx={{width: 500, padding: 2}}>
              <Typography>{product.title}</Typography>
              <CardMedia
                component="img"
                height="200"
                sx={{
                  width: "100%",
                  height: 250,
                }}
                image={image}
                alt="green iguana"
              />
            </Card>
            <Grid item sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 500,
            }}>
              <div>
                <span>Description: <strong>{product.description}</strong></span>
              </div>
              <div>
                <span>Price: <strong>{product.price} som</strong></span>
              </div>

              <div>
                <span>Catagory: <strong>{product.category.categoryName}</strong></span>
              </div>
            </Grid>

            <Grid item>
              <div>
                <span>Salesman: <strong>{product.user.username}</strong></span>
              </div>

              <div>
                <span>Phone: <strong>{product.user.phoneNumber}</strong></span>
              </div>
            </Grid>
            {btnDelete}
          </Grid>
        )
      }
    </>
  );
};

export default Product;