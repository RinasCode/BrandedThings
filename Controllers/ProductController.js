const { Op } = require('sequelize')
const {Category,User,Product} = require ('../models')
const cloudinary = require("../utils/cloudinary")


class ProductController {
   static async readProduct(req, res, next) {
      try {
          const { category, author, search, sort } = req.query
          const paramsQuery = {include: [User, Category]}

          if (category !== '' && typeof category !== "undefined") {
              if (category) {
                  if (author) {
                      paramsQuery.where = {
                          categoryId: category,
                          authorId: author
                      },
                          paramsQuery.order = [["createdAt", "ASC"]]
                  } else {
                      paramsQuery.where = {
                          categoryId: category
                      },
                          paramsQuery.order = [["createdAt", "ASC"]]
                  }
              }

          } else {
              if (author !== '' && typeof author !== "undefined") {
                  if (author) {
                      paramsQuery.where = {
                          authorId: author
                      },
                          paramsQuery.order = [["createdAt", "ASC"]]
                  }
              }
          }
          // console.log(category);
          // console.log(author);

          if (sort) {
              const ord = sort[0] === "-" ? "DESC" : "ASC"
              const sortBy = ord === "DESC" ? sort.slice(1) : sort
              paramsQuery.order = [[sortBy, ord]]
          }

          // console.log(sort);

          if (search) {
              paramsQuery.where = {
                  name: { [Op.iLike]: `%${search}%` }
              }
          }

          const products = await Product.findAll(paramsQuery)
          res.status(200).json({
              message: "Success Read Products",
              products
          })
      } catch (error) {
          console.log(error);
          next(error)
      }
  }


 static async addProduct (req,res,next) {
    try {
      const {userId} = req.loginInfo
            if(!userId) throw ({name: "Unauthorized"})
            // console.log(userId);
            const { name, description, price, stock, categoryId, imgUrl } = req.body
      
      const products = await Product.create({
         name,
         description,
         price,
         stock,
         imgUrl,
         categoryId,
         authorId: userId
      })
      res.status(201).json({
         message : "Success create Product",
         products
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
 }

 static async editProduct (req,res,next) {
    try {
    const {id} = req.params

    const products = await Product.findByPk(id)

    if(!products) throw ({ name :"Product Not Found", id})
    
    const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body
    await Product.update({ name, description, price, stock, imgUrl, categoryId, authorId }, {
        where : {
            id
        }
    })

    res.status(200).json({
        message :`Success Update Products with id ${id}`
    })

    } catch (error) {
      console.log(error);
      next(error)
    }
 }

 static async deleteProduct (req,res,next) {
    try {
        const {id} = req.params
        const products = await Product.findByPk(id)
    
        if(!products) throw ({ name : "Product Not Found",id})
        
        await Product.destroy({
            where : {
                id
            }
        })
    
        res.status(200).json({
            message :`Success Delete Product with id ${id}`
        })
        } catch (error) {
          console.log(error);
          next(error)
        }
 }

 static async detailProduct (req,res,next) {
    try {
    const {id} = req.params
    const products = await Product.findByPk(id, {
        include: [User,Category]
    })

    if(!products) throw ({ name :"Product Not Found", id })
    
    res.status(200).json({
        message:`Success read Product with id ${products.id}`,
        products
    })
    } catch (error) {
      console.log(error);
      next(error)
    }
 }

 
    static async patchImgUrl(req, res, next) {
        try {
            const { id } = req.params;
            const products = await Product.findByPk(id);

            if (!products) throw ({ name: "Product Not Found", id });

            const dataImg = `data:image/png;base64,${req.file.buffer.toString('base64')}`;
            console.log(dataImg, "isi dari data IMG");

            const result = await cloudinary.uploader.upload(dataImg, {
                public_id: req.file.originalname
            });

            const imgUrl = result.secure_url;

            await Product.update({ imgUrl }, {
                where: {
                    id
                }
            });

            res.status(200).json({
                message: `Success Update Products with id ${id}`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}


module.exports = ProductController