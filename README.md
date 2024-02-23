# GeekStore
e-Commerce en stack MERN (MongoDB, Express.js, React, Node.js). Utiliza Redux Toolkit (y Redux Toolkit Query para comunicarse con la API), Mongoose, autorizacion de usuarios con JWT.
***

# Deploy local (Docker, Linux)

### Preparacion
* Clonar el proyecto
* Descargar los programas necesarios:
    - [Node.js](https://nodejs.org/en)
    - [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - [MongoDB Compass](https://www.mongodb.com/try/download/compass)

### Back end
  * Iniciar Docker Desktop
  * Abrir una terminal en la carpeta `server`
  * Lanzar el servidor con el siguiente comando:
    `docker compose up --build -d`
### Base de datos
  * Iniciar MongoDB Compass
  * Conectarse a la DB con la Connection String (`mongodb://localhost:27017` con la configuracion default)
  * Abrir la coleccion `products` en la base de datos storedb
  * Clickear `Import data`. Se abre una ventana, seleccionar el archivo `server/db/storedb.products.json` y clickear `Import`
### Front end
  * Navegar a `client` y abrir una terminal
  * Iniciar el front end con el comando `npm run dev`. Por defecto se abre en `localhost:8081`
### Agregar una cuenta de administrador
  * En la página, clickear el boton `Iniciar Sesion` y a continuacion registrar una nueva cuenta
  * Abrir Compass nuevamente, en la coleccion `users` aparecera la cuenta registrada. Para habilitarla como administrador, hacer doble click en la propiedad `isAdmin` y setearla a `true`
***

# Live demo

Se puede ver una demo del proyecto en https://geekstore-client.fly.dev/

* Por seguridad, las funciones de CRUD no estan disponibles, solo registro de cuenta e inicio de sesion
* Puede tardar un poco en cargar, por cuestiones de la funcionalidad gratis de fly.io
