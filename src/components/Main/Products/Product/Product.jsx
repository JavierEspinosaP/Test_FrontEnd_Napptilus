import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useInView } from 'react-intersection-observer';


function Product(props) {

  const { ref, inView } = useInView();

  const product = props.product;
  const [opacity, setOpacity] = useState(0);

  //useEffect para crear el efecto de aparición cuando el usuario hace scroll, si la tarjeta está en pantalla "inView" es true y crea 
  //la transición de opacity 0 a 1
  useEffect(() => {
    if (inView) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
    AOS.init();
  }, [inView]);

  return (
    <div className={`productContainer ${inView ? 'show' : ''}`}>
      <Card ref={ref} sx={{ maxWidth: 260, minWidth: 260, margin: 1, maxHeight: 400 }}>
        <CardMedia
          component="img"
          style={{ minWidth: "130px", maxWidth: "130px" }}
          image={product.imgUrl}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           <b>· Marca: </b>  {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <b>· Modelo: </b> {product.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <b>· Precio: </b> {product.price} €
          </Typography>
        </CardContent>
        <Button><Link className="detailsLink" to={`/product/${product.id}`}>  Ver detalles</Link></Button>
      </Card>
    </div>
  )
}

export default Product
