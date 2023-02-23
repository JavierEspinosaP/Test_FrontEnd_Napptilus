<h1 display="flex" align="center">
  <p align="center">Mobile Store</p>
  <img width="32px" src="https://i.postimg.cc/cJJ6ZsVP/phone.png" alt="mobile"></a>
  <h3 align="center">Accede al despliegue en el siguiente botón</h3>
</h1>
  <div align="center">
  <a  href="https://main--preeminent-bonbon-b82f5d.netlify.app/"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>
</p>
</div>

## Introducción

Prueba técnica para Napptilus, en ella se requería desarrollar una aplicación en React con dos vistas, una general donde se muestran móviles y donde se puede hacer una búsqueda y filtrado de ellos por marca y modelo, y una vista detalle que permite seleccionar almacenamiento y color y añadirlos a una cesta de la compra.

Como extra he añadido una tercera vista con un carrito de la compra desarrollado en Redux en el que se puede aumentar, disminuir y eliminar productos de la cesta.

## Vistas

### Home

![Home](https://user-images.githubusercontent.com/103537170/220968325-60f5a08b-b91d-435d-939d-cb26ec9d0649.jpg)

Para esta vista se requería que los productos se ordenasen en 4 columnas y que se adaptasen a pantallas con distinta anchura, para ello he utilizado media queries para adaptar las tarjetas dependiendo del dispositivo en el que se visione la página.

Los datos de los productos se almacenan en un estado de Redux (_products) así como en una clave de local storage (products). Para conseguir la persistencia de los datos y no hacer continuamente peticiones al servidor al renderizar la página, se comprueba si ha pasado 1h desde la última petición, si es así se vuelve a realizar un fetch para refrescar los datos y guardarlos de nuevo en local storage.

Además, he añadido un input de búsqueda con un debounce de 0.5s, pasado dicho intervalo, se dispara una función que filtra los productos por el texto introducido en tiempo real.

En el header podemos ver el logo, que devuelve a la vista principal, un bredcrumbs que nos indica que estamos en Home, y a la derecha un texto que nos indica si hay algún producto añadido a la cesta, junto con su logo, que sirve como link a su vista.

Como vemos en la siguiente imagen, si accedemos a la vista detalle de un producto, el breadcrumbs nos indica en qué vista estamos, lo mismo ocurre si accedemos al carrito de compra.

![breadcrumbs](https://user-images.githubusercontent.com/103537170/220971861-db7329a0-fc74-40ae-82ff-2a4fa093e356.jpg)


### Vista detalle

En esta vista se nos muestran los detalles del producto que hayamos seleccionado, su imagen a la izquierda y a la derecha sus propiedades y unas opciones de compra, almacenamiento y color, junto con un botón para añadir al carrito y, en la esquina inferior derecha uno para volver a la lista de productos.

![Detalle](https://user-images.githubusercontent.com/103537170/220972960-81ca8ef5-0a6e-4f12-b9e0-6d55e7a18269.jpg)

Si añadimos el producto al carrito, se indicará en el header

![productoAñadido](https://user-images.githubusercontent.com/103537170/220973587-ade1af3b-8e39-4615-b270-1fd90be2527b.jpg)

También se añadirá a dos claves distintas en local storage, debido a que el endpoint no devuelve la información correctamente (solo devuelve "count: 1"), he optado por guardar la información en local storage con los parámetros necesarios para la respuesta (la función de petición está preparada para usarse).
La segunda clave la utilizo para persistir los datos aunque el usuario cierre el navegador. La lógica del carrito está desarrollada para que guarde la hora a la que se ha añadido el último producto, y si el usuario no añade nada en una hora, se borran los datos de la cesta.

### Vista carrito

![Carrito](https://user-images.githubusercontent.com/103537170/220975101-9002374d-5333-41c4-9f09-f2e93c37252a.jpg)

Además como extra, he añadido esta vista para mostrar los productos añadidos a la cesta, en ella se puede aumentar o disminuir los productos seleccionados o borrarlos, todo a través de reducers.

## How to run

Para arrancar el proyecto en local simplemente es necesario seguir los siguientes pasos:

 #### 1.- Clonar el proyecto ejecutando "git clone https://github.com/JavierEspinosaP/Test_FrontEnd_Napptilus.git" en consola.
 #### 2.- Ejecutar "npm install" para instalar las dependencias necesarias
 #### 3.- Ejecutar "npm start" para arrancar el proyecto.
 
 Con ello se abrirá una pestaña en el navegador por defecto con la página en local.

## Contacto

- [Linkedin](https://www.linkedin.com/in/javier-espinosa-fs/)

- Email: javierespinosapasamontes@gmail.com
