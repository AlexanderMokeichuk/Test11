import React from "react";
import {ProductApi} from "../../../../type";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import noImage from "./../../../../../public/noimage.svg";
import {API_URL} from "../../../../constants";

interface Props {
 product: ProductApi,
}

const ProductCard: React.FC<Props> = ({product}) => {
  let image = noImage;

  if (product.image) {
    image = API_URL + "/" + product.image;
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
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
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;