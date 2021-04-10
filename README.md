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

#### Part 08 - Products(2) - Filter , Sort, Pagination ####

* Agregando APIfeatures clase en controllers/productCtrl.js
* Agregando funcionalidad al GET de products para buscar productos por nombre, ordenar de menor a mayor el precio o el titulo y varias cosas mas /api/products?sort=price&title[regex]=silla
* DOCUMENTACION DE COMO USAR EL GET PRODUCTOS EN EL CODIGO EN EL "APIfeatures" O EN POSTMAN "/api/products ---> GET, POST, DELETE, PUT productos" 

#### Part 12 - Client - Cart ####

* Agregando el endpoint /user/addcart para guardar en la base de datos en el atributo "cart" todos los productos que agrgue el usuario es un arreglo con objetos dentro (los productos)
* Agregando el router y el controlador para addcart


#### Part 13 - Cart - Payment ####

* Agregando payment  MODEL , CONTROLADOR , ROUTER para el backend del payment
* Agregando ese path a el server.js /api/payment


#### Part 14 - Payment - Order History ####

* Actualizando el paymentCtrl.js para que actualize el atributo "sold" del producto el cual se vendió y tambien para guardar pedido en base de datos con las informacion del pedido y del usuario
* Actualizando el userCtrl.js con un nuevo controlador llamado "history" para que busque en la base de datos en la coleccion de Payments los pedidos que coincidan con el id del usuario que esta haciendo la peticion y asi mandarle su historial de pedidos
* Acutalizando el userRouter.js para agregar ese nuevo controlador en "/user/history/"


#### Part 15 - Client - Categories ####

* debuggeando en  categoryCtrl.js en el atributo createCategory: de | catch (error) | a | catch (err) |

#### Part 16 - Client - Create Product(1) ####

* Cambiando el tiempo de expiracion del createAccessToken de 1 dia a 11 minutos y cambiando el tiempo de expiracion del createRefreshToken de 7 dias a 1 dia
* quitando varios console.log(err)