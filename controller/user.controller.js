const User = require('../model/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            throw new Error("User already exists")
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            console.log("hash", hash)
            const newUser = new User({ name, email, password: hash })
            await newUser.save();
            res.status(200).json({ status: 'success'});
        }

    } catch (err) {
        res.status(400).json({ status: 'fail', err: err });
    }
}

userController.loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v"); // 지금 지우면 되는 것들
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status:'success', user, token });
            }
        }
        throw new Error("Invalid email or password");
    } catch (err) {
        res.status(400).json({ status: 'fail', err: err });
    }
}

module.exports = userController;