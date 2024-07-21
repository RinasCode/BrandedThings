if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const CategoryController = require('./Controllers/CategoryController');
const errorHandler = require('./middleware/errorHandler');
const ProductController = require('./Controllers/ProductController');
const UserController = require('./Controllers/UserController');
const upload = require('./middleware/multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/category', CategoryController.readCategory);
app.post('/category', CategoryController.addCategory);
app.put('/category/:id', CategoryController.editCategory);
app.delete('/category/:id', CategoryController.deleteCategory);

app.get('/product', ProductController.readProduct);
app.get('/product/:id', ProductController.detailProduct);
app.post('/product', ProductController.addProduct);
app.put('/product/:id', ProductController.editProduct);
app.delete('/product/:id', ProductController.deleteProduct);
app.patch('/product/:id', upload.single("imgUrl"), ProductController.patchImgUrl);

app.get('/user', UserController.readUser);
app.post('/add-user', UserController.registerUser);
app.post('/login', UserController.LoginUser);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
