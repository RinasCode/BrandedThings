const {Category,User,Product} = require ('../models')


class CategoryController {
static async readCategory (req,res,next) {
    try {
        const data = await Category.findAll()
        res.status(200).json({
            message : "Success read Categories",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

static async editCategory (req,res,next) {
    try {
        const {id} = req.params

        const categories = await Category.findByPk(id)

        if(!categories) throw ({ name : "Category Not Found",id})


        const {name} = req.body
        await categories.update ({name},{
            where: {
                id
            }
        })

        res.status(200).json({
            message: `Success Update Products with id ${id}`
        })

    } catch (error) {
      console.log(error);
      next(error)
    }
}

static async deleteCategory (req,res,next) {
    try {
        const {id} = req.params
        const categories = await Category.findByPk(id)

        // console.log(categories,'>>>>>>>>>>....cepu');

        if(!categories) throw ({ name : "Category Not Found",id})
        
        await Category.destroy ({
            where : {
                id
            }
        })

        res.status(200).json ({
            message : `Success Delete Categories with id ${id}`
        })

    } catch (error) {
      console.log(error);
      next(error)
    }
}

static async addCategory (req,res,next) {
    try {
        const {name} = req.body
        const categories = await Category.create({name})

        res.status(201).json({
            message : "Success create categories",
            categories
        })
    } catch (error) {
        console.log(error);
        next(error)
        }
    }
}


module.exports = CategoryController