const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

function passwordProtected(req, res, next){
    res.set('WWW-Authenticate', 'Basic realm="Lutfen toplanti sifresini giriniz."')
    if (req.headers.authorization == "Basic Z2xpZm9yMjAyMTpnbGlmb3IyMDIx") {
       next() 
    }else{
        res.status(401).send("Yanlış şifre girildi")
    }
}
///
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router