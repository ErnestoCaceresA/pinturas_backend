const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userCtrl = {
    register: async(req, res) => {
        try {
            const {name, email, password} = req.body;

            // validar si ya existe ese email
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "Este email ya existe"})
            // validar que la contraseña tenga longitud mas de 6 caracteres
            if(password.length < 6) return res.status(400).json({msg: "La contraseña debe contener almenos 6 caracteres"})
            // Encriptar contraseña
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            // Guardar Usuario en Base de datos
            await newUser.save();
            // Crear JWT para autenticacion
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            // registro exitoso 
            res.json({
                msg: "Register Success",
                newUser,
                accesstoken
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            // encontrar al usuario en la base de datos
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "El usuario no existe"})
            // ver si coincide su contraseña con la que hizo al registrarse
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Contraseña incorrecta"})

            // if login is success, create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            
            res.json({
                msg: "Login Success!",
                accesstoken
            })

        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req , res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login or Register"})
                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

            res.json({rf_token})

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password") //dentro del req.user que se creo en el middleware auth esta el id, y no se mostraá la contraseña
            // res.json(req.user) //si tiene el token correcto del middleware auth ahi mismo se creo este atributo de req donde retorna el id junto con "iat" y "exp"
            if(!user) return res.status(400).json({msg: "User doesnt exist"})

            res.json(user)

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    }
}

// -----------------------------------
// funciones helpers

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl