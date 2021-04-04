## MERN STACK PAJO-ECOMMERCE ##

#### Part 01 - setup ####

* dependencies:
    * bcrypt
    * cloudinary
    * concurrently
    * cookie-parser
    * cors
    * dotenv
    * express
    * express-fileupload
    * jsonwebtoken
    * mongoose

* HACIENDO CONEXION A BASE DE DATOS Y PLANTILLA BASICA DE BACKEND

#### Part 02 : Register - AccessToken - RefreshToken ####

* /user (Agregando route en server.js)
* Agregando Register "/user/register" (endpoint para registrar usuarios)
* Agregando AccessToken
* Agregando RefreshToken


#### Part 03 - Login - Logout - Info User ####

* Agregando Login "/user/login" (para que se logeen los usuarios existentes)
* Agregando Logout "/user/logout" (para borrar las cokies)
* Agregando Infor "/user/infor" (para revisar la informacion de algun usuario a traves del header Autherization con el valor de la accesstoken que da al logearse)

#### Part 04 - Category(1) ####

* /api  (Agregando route en server.js)
* Agregando category /api/category (Metodo GET para ver las categorias que se encuentran en la base de datos) getCategories
* Creando categoryModel para base de datos
* Creando categoryRouter, categoryCtrl
* Creando middleware authAdmin (para verificar si el usuario es admin)

#### Part 05 - Category(2) ####

* Agregando CRUD de category /api/category (GET: para ver categorias, POST: para crear categoria(solo admin), DELETE: borrar categoria (solo admin), PUT: actualizar categoria (solo admin))

#### Part 06 - Upload and Delete Image on Cloudinary ####

* No olvidar cuenta de cloudinary
* Agregando upload  /api/upload (POST: para subir imagenes a cloudinary (solo admin))
* Agregando destroy  /api/destroy (POST: para borrar imagenes de cloudinary mediante su public_id)

#### Part 07 - Products(1) - CRUD ####

* Creando Router, model, controlador de los productos, products.js
* Agregando CRUD de productos /api/products (GET: para ver los productos, POST: para crear productos, DELETE: para borrar productos, PUT: para actualizar producto)