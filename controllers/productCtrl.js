const Products = require('../models/productModel')

// FILTER, SORTING AND PAGINATION

class APIfeatures{

    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString
    }

    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))


        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        // -------------------------------------------------------------------------------------------------------------------------
        /* filtrar precio dependiendo el queryString que mande

            gte = (greater than or equal) mayor que o igual
            lte = (Lesser than or equal) menor que o igual
            lt = (Lesser than) menor que
            gt = (greater than) mayor que 
            
            /api/products?price=550  ---> solamente mostrara los que tienen ese precio exacto
            
            /api/products?price[gte]=550  ---> solamente mostrara los que tiene de ese precio en adelante o sea los que cuestan mas que 550 (si incluye el 550 exacto)

            /api/products?price[lt]=550   ---> solamente mostrara los que tienen precio menos a 550 (no incluye el 550 exacto)

            /api/products?price[gt]=550   ---> solamente mostrara los que tiene de ese precio en adelante o sea los que cuestan mas que 550 (no incluye el 550 exacto)
         
            /api/products?price[lte]=550  ---> solamente mostrara los que tienen precio menor a 550 (si incluye el 550 exacto)
        */
       // ----------------------------------------------------------------------------------------------------------------------------

       //------------------------------------------------------------------------------------------------------------------------------
       /* filtrar por nombre de producto 
        
        /api/products?title[regex]=a  ---> solamente mostrara los productos que en su titulo incluyan una "a"

        /api/products?title[regex]=cat ---> solamente mostrara  los productos que en su titulo incluyan "cat"

       */
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){

        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        // ------------------------------------------------------------------------------------------
        /*
            SORTING: dependiendo de que sort le mandes ordena los productos ya sea de menor a mayor o de mayor a menor

            /api/products?sort=price  ---> ordena los productos por su precio de menor a mayor

            /api/products?sort=-price  ---> ordena los productos por su precio de mayor a menor (se le pone signo negativo al "-price")

            /api/products?sort=title  ---> ordena los productos pro su titulo ordenado alfabeticamente

            /api/products?sort=-title  ---> ordena los productos por su titulo ordenado de la Z a la A inversamente al alfabeto

        */
       // ------------------------------------------------------------------------------------------

       // ------------------------------------------------------------------------------------------
        /*
            COMBINADO SORTING Y FILTERING

            /api/products?sort=price&title[regex]=silla  ---> ordena los productos que incluya "silla" en su titulo y lo ordena de menor a mayor por su precio

        */
       // ------------------------------------------------------------------------------------------

        return this;
    }

    paginating(){

        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9   //   * 1 || (este numero es cantidad de resultados en una pagina en este caso 9 por pagina)
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}


// CRUD PRODUCTOS

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering()
                .sorting()
                .paginating()
            // buscar en base de datos todos los productos existentes
            const products = await features.query

            res.json({
                stauts: 'success',
                result: products.length,
                products: products
            })
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