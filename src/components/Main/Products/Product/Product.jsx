import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Product(props) {


  const [opacity, setOpacity] = useState(0);
  const product = props.product

  useEffect(() => {
    setOpacity(1);
  }, []);
  
  return (
    <div style={{ transition: "opacity 2s ease", opacity: opacity }}>
      <Card sx={{ maxWidth: 250, minWidth: 250, margin: 1, maxHeight: 400 }}>
        <CardMedia
          component="img"
          style={{minWidth:"130px", maxWidth: "130px" }}
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
        <Button><Link className="detailsLink" to={`/product/${product.id}`}>Ver detalles</Link></Button>
      </Card>

    </div>
  )
}

export default Product
