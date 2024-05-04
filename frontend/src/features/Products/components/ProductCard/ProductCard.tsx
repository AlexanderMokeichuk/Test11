import React from "react";
import {ProductApi} from "../../../../type";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import noImage from "./../../../../../public/noimage.svg";
import {API_URL} from "../../../../constants";
import {Link} from "react-router-dom";

interface Props {
 product: ProductApi,
}

const ProductCard: React.FC<Props> = ({product}) => {
  let image = noImage;

  if (product.image) {
    image = API_URL + "/" + product.image;
  }

  return (
    <Link to={`/show-product/${product._id}`} style={{textDecoration: "none"}}>
      <Card sx={{ maxWidth: 300 , padding: 2}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            sx={{
              width: "100%",
              height: 150,
            }}
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <h2>Price: {product.price} som</h2>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;