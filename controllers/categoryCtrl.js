const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            // ir user hace role = 1 --> es admin
            // tiene que pasar antes por los middlwares "auth" y "authAdmin"
            //user: admin , email: admin@gmail.com , password: 123456
            const {name} = req.body;
            
            // no se pueden duplicados de categorias
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Esa categoria ya existe"})
            
            // guardar categoria en base de datos
            const newCategory = new Category({name})
            await newCategory.save()
            
            res.json(`Categoria ${name} creada satisfactoriamente`)
            
        } catch (error) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Categoria borrada"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            // Encontrar la categoria por el id que se pasa como parametro /api/category/id_de_categoria, y despues actualizar
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Categoria actualizada correctamente"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl