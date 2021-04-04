const fs = require('fs')

const router = require('express').Router()
const cloudinary = require('cloudinary')
// middlewares
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

// ONLY ADMIN CAN UPLOAD AND DELETE IMAGE
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// UPLOAD IMAGE
router.post('/upload', auth, authAdmin,  (req, res) => {
    try {
        console.log(req.files) //se veran todas las propiedades de un archivo cuando se sube como su .size o .mimetype y todos esos
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No se subió ningun archivo'})

        // guardar el archivo, que se va a mandar en el body en "form-data" cambiando de "text" a "file" , en variable
        const file = req.files.file;

        // si es muy pesado el archivo no subir
        if(file.size > 1024*1024){ //1024*1024 = 1mb , 1024*1024*5 = 5mb

            removeTmp(file.tempFilePath) //eliminar del local si es que sube un archivo muy pesado porque comoquiera se sube en la carpeta temp aqui
            return res.status(400).json({msg: "El archivo es demasiado pesado"})
        } 

        // si el tipo de archivo no es de tipo imagen no subir
        if(file.mimetype !==  "image/jpeg" && file.mimetype !==  "image/png" ){

            removeTmp(file.tempFilePath) //eliminar del local si no es una imagen porque comoqueiera se sube aqui en la carpeta temp
            return res.status(400).json({msg: "El formato del archivo es invalido"})
        }

        //Guardar imagen en cloudinary y se guardara en la carpeta "test" y nos retornara cosas utiles entre ellas el url de la imagen subida en la nube
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result) => {
            if(err) throw err;
            
            removeTmp(file.tempFilePath) //eliminar para que no se guarden las imagenes aqui en local
            res.json({
                // result //saldran todas las propiedades del objeto pero no se pone entre llaves res.json(result)
                public_id: result.public_id,
                url: result.secure_url
            })
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
})

// DELETE IMAGE
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const {public_id} = req.body;
        // si no se selecciona ninguna imagen (si no manda ningun public_id en el body)
        if(!public_id) return res.status(400).json({msg: "Ninguna imagen fue seleccionada"})
        
        //eliminar de cloudinary 
        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;

            res.json({msg: "Imagen borrada exitosamente"})
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
    
})

// ------------------------------------------
// helpers

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
} 

module.exports = router