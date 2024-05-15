# Herramientas necesarias para para ejecutar este código.

Node.js v16.20.2
PostgreSQL
PSQLshell

## Pasos a seguir

Descargar los 2 repositorios.

Hacer npm i en ambos repos.

Crear un archivo .env en la raíz del proyecto con los siguientes datos:

DB_USER= postgres

DB_PASSWORD= admin123

DB_HOST= localhost

PORT= 5432


En caso de ya tener una cuenta en postgres, iniciar sesion con los datos dados en psql shell.

Hacer npm start en ambos repos.

### Rutas BACK-END

Esto traerá todos los productos.

_GET= "http://localhost:3001/products/" 

Esta ruta creará un nuevo producto.

_POST= "http://localhost:3001/products/createProduct" 

Esta ruta edita los productos.

_PUT= "http://localhost:3001/products/update/:id" 

Esto elimina los productos.

_DELETE= "http://localhost:3001/products/delete/:id" 

### Rutas FRONT-END

Esta ruta servirá para crear una cuenta y loguearse.

"http://localhost:300/login"

En esta ruta se mostrará todos los productos con su paginado y una navBar para crear un nuevo producto.

"http://localhost:300/home"

En esta ruta se podrá crear un nuevo producto que aparecerá al final de todos los ya creados.

"http://localhost:300/create"


