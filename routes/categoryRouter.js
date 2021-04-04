const router = require('express').Router()
// controladores
const categoryCtrl = require('../controllers/categoryCtrl')

router.route('/category').get(categoryCtrl.getCategories)


module.exports = router