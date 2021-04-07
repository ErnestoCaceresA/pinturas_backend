const router = require('express').Router()

// middlewares
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

// controladores
const paymentCtrl = require('../controllers/paymentCtrl')


router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router