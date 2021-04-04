const router = require('express').Router()
// controladores
const userCtrl = require('../controllers/userCtrl')
// middlewares
const auth = require('../middlewares/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshToken)
router.get('/infor', auth , userCtrl.getUser )

module.exports = router;