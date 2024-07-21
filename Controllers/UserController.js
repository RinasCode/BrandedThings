const { comparePassword } = require('../helpers/bycrpt');
const { token } = require('../helpers/jwt');
const { User, Category, Product } = require('../models');

class UserController {
    static async readUser(req, res, next) {
        try {
            const user = await User.findAll();

            res.status(200).json({
                message: "Success read User",
                user
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async LoginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "Bad Request" };

            const login = await User.findOne({
                where: {
                    email
                }
            });
            // console.log(login, "isi login");
            if (!login) throw { name: "Login Error" };

            const isPasswordValid = comparePassword(password, login.password);
            if (!isPasswordValid) throw { name: "Login Error" };
            // let data = await compare(password, login.password)
            // console.log(data,"isi data")

            const payload = {
                id: login.id,
                email: login.email,
                role: login.role
            };
            // console.log(payload,"isi payload");
            const access_token = token(payload);

            res.status(200).json({
                access_token,
                message: `Success Login with ${email}`
            });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async registerUser(req, res, next) {
        try {
            //  res.send("test")
            const { username, email, password, phoneNumber, addres } = req.body;
            const newUser = await User.create({ username, email, password, phoneNumber, addres });
            // console.log(newUser);
            res.status(201).json({
                message: "Success create User"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = UserController;
