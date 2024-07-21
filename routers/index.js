const express = require("express")
const UserController = require("../Controllers/UserController")
const errorHandler = require("../middleware/errorHandler")
const authentication = require("../middleware/authentification")
const { adminAuthorization } = require("../middleware/authorization")
const router = express.Router()
const productRouter = require("../routers/product")
const categoryRouter = require("../routers/category")
const PublicController = require("../Controllers/PublicController")

//CRUD Users
router.get('/public/products', PublicController.readProduct)
router.post('/login', UserController.loginUser)

router.use(authentication)

router.post('/add-user', adminAuthorization, UserController.registerUser)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)

router.use(errorHandler)

module.exports = router