## MERN STACK PAJO-ECOMMERCE ##

#### Part 01 - setup ####
dependencies:

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
* Agregando category /api/category (Metodo GET para ver las categorias que se encuentran en la base de datos)
* Creando categoryModel para base de datos
* Creando categoryRouter, categoryCtrl
* Creando middleware authAdmin