const express = require("express")
const ProductController = require("../Controllers/ProductController")
const { productAuthorization } = require("../middleware/authorization")
const upload = require("../middleware/multer")
const router = express.Router()

//CRUD Products
router.get("/", ProductController.readProduct)
// router.post("/", (req, res) => {
//     upload.single("imgUrl")

//     if(req.file) {
//         upload.single("imgUrl"), ProductController.addProduct
//     }else
//         ProductController.addProduct
// })
router.post('/', ProductController.addProduct)
router.get("/:id", ProductController.productDetail)
router.delete("/:id", productAuthorization, ProductController.deleteProduct)
router.put('/:id', productAuthorization, ProductController.editProduct)
router.patch('/:id', upload.single("imgUrl"), ProductController.patchImageUrl)

module.exports = router