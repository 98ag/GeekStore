# GeekStore
e-Shop en stack MERN (MongoDB, Express.js, React, Node.js). Se usan las herramientas Mongoose para conexion a base de datos y Redux para manejo de estado global.

# Como lanzar localmente
  * Descargar los programas necesarios:
    - [Node.js](https://nodejs.org/en)
    - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Recomendado: instalar MongoDBCompass para visualizar la base de datos graficamente)

  * Crear la carpeta `C:/data/db`
  * Lanzar MongoDB en una terminal con el comando `mongod` (De no ser reconocido, [seguir las instrucciones en este articulo](https://medium.com/@therkverma/set-mongodb-in-the-windows-path-environment-9d4c81477b32))
  * En Compass, conectar a la base de datos local (configuracion default) y crear una nueva database con el nombre `storedb` y la collection `productos`
  * Click en `import data` -> `DbSample.json` -> `Import`
  * Abrir una terminal en `/server/` y una en `/client/`. En ambas ejecutar `npm install`.
  * Ejecutar `npx tsx server.ts` en la terminal de `/server/`
  * Ejecutar `npm run dev` en la terminal de `/client/`

# Live demo
Se puede ver una live demo del sitio en el siguiente link: https://geekstore-qc7g.onrender.com/
Notas:
* Puede tardar en cargar o necesitar recargarla varias veces (por limitaciones del free tier de render.com)
* Puede que las features en el live demo sean diferente a las del codigo fuente. Faltan cosas por hacer :)
