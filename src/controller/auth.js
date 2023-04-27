const userModel = require('../model/user');
const bcrypt = require('bcrypt');

const saltRounds = 4;
const salt = bcrypt.genSaltSync(saltRounds);

class Auth{ 
    singin = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if(password.length >= 8){
            const user = await userModel.findOne({email: email})
            if(user) {
                const PasswordController = bcrypt.compareSync(password, user.password);
                if(PasswordController) {
                    res.status(200).json({ 
                       uid: user._id,
                       fullname: user.fullName,
                       city: user.city,
                       email: user.email
                    })
                }else {
                    res.status(400).json({ massage: "password or email is wrong"})
                }
            }else {
                res.status(400).json({ massage: "password or email is wrong"})
            }
        }else {
            res.status(400).json({ massage: "password or email is wrong"})
        }

    }
    singup = async (req, res) => {
        const fullName = req.body.fullname;
        
        if (fullName != "" && fullName.length > 4){
            const password = req.body.password;
            if (password.length >= 8) {
                const email = req.body.email;

                const emailController = await userModel.find({email: email})
                if (emailController.length == 0){
                    const newUser = new userModel({
                        fullName: fullName,
                        email: email,
                        password: bcrypt.hashSync(password, salt),
                        city: 'Karaganda',
                        balance: 0
                    }).save();
                    res.status(200).json({ massage: 'user created' })
                }else {
                    res.status(400).json({ massage: 'email already exists' })
                }   
            }else {
                res.status(400).json({massage: 'password must be more than 4 characters'})
            }
        }else {
            res.status(400).json({ massage: 'enter full name' })
        }
    }
}

module.exports = new Auth;