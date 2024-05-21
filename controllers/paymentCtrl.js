const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

const paymentCtrl = {
    getPayments: async(req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            console.log(req)
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "Usuario no existe"}) 
            // obtener informacion de la compra y del usuario
            const {cart, paymentID, address} = req.body;
            const {_id, name, email} = user;
            // crear newPayment
            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })
            
            // console.log(newPayment) //imprime el objeto con toda la informacion del newPayment en consola

            // acutalizar el numero de "sold" de cada producto comprado con un iterador
            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            // guardar en base de datos el newPayment
            await newPayment.save()

            res.json({msg: "Payment Success!"})
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    }
}

// -----------------------------------------
// helpers

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({_id: id,}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl