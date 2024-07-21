const { Op } = require('sequelize')
const {Product} = require ('../models')

class PublicController {
    static async readProduct(req, res, next) {
        try {
            // console.log(req.query);
            const { category, author, search, sort, page } = req.query
            const paramsQuery = {}

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
            // console.log(search);

            let limit = 10
            let pageNumber = 1
            if (page) {
                if (page.data) {
                    limit = Number(page.data)
                    paramsQuery.limit = limit
                }

                if (page.number){
                    pageNumber = Number(page.number)
                    paramsQuery.offset = limit * (pageNumber -1)
                }
                
            }
            // console.log(page)

            const {count, rows} = await Product.findAndCountAll(paramsQuery)
            res.status(200).json({
                message: "Success Read Products",
                page : pageNumber,
                data: rows,
                totalProducts: count,
                totalPage: Math.ceil(count/limit),
                productsPerPage: limit
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PublicController