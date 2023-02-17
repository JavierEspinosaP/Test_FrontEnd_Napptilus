import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Product(props) {

  const product = props.product
  console.log(product);
  
  return (
    <div>
      <Card sx={{ maxWidth: 260, minWidth: 260, margin: 1, minHeight: 300 }}>
        <CardMedia
          component="img"
          style={{ height: "75%", width: "75%",minWidth:"180px", maxWidth: "180px" }}
          image={product.imgUrl}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            - Marca: {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Modelo:{product.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Precio:{product.price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Product
