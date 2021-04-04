const Products = require('../models/productModel')

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            // buscar en base de datos todos los productos existentes
            const products = await Products.find()

            res.json(products)
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            // en el apartado de images se sube un objeto con dentro el public_id y el url de la imagen que se subio a cloudinary
            
            //si no se sube ninguna imagen 
            if(!images) return res.status(400).json({msg: "No image upload"})
            
            //si ya existe ese producto con ese id 
            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg: "Este producto ya existe"})

            // si todo esta bien entonces crear un nuevo producto
            const newProduct = new Products({
                product_id, 
                title: title.toLowerCase(), 
                price, 
                description, 
                content, 
                images, 
                category
            })

            // Guardar en base de datos el producto
            await newProduct.save()

            res.json({
                msg: "Nuevo Producto creado",
                newProduct
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async (req, res) => {
        try {
            //el id se manda como parametro /api/products/id_del_producto

            // borrar de base de datos
            await Products.findByIdAndDelete(req.params.id)


            res.json({msg: "Se borro el producto satisfactoriamente"})

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;

            //si no se sube ninguna imagen 
            if(!images) return res.status(400).json({msg: "No image upload"})

            // actualizar producto (se queda con el mismo id)
            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), 
                price, 
                description, 
                content, 
                images,
                category
            })

            res.json({
                msg: "Producto actualizado correctamente",
                
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productCtrl