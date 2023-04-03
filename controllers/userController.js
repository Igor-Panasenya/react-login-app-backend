const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models.js');

const generateJwt = (id, email, username) => {
    jwt.sign({
            id,
            email,
            username
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res) {

        try {
            const {username, email, password, image} = req.body;

            console.log(req.body)

            const existUsername = await User.findOne({where: { username }})
            if (existUsername) {
                return res.status(400).send("Please, use unique Username");
            }

            const existEmail = await User.findOne({where: { email }})
            if (existEmail) {
                return res.status(400).send("Please, use unique Email");
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                userImage: image,
                firstName: '',
                lastName: '',
                company: ''
            })

            const token = generateJwt(user.id, user.email, user.username)

            return res.json({token})

        } catch (err) {
            return res.status(500).send(err);
        }
    }
    async login(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(404).send('No user with this email was found.');
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).send('Invalid Password.');
        }
        const token = generateJwt(user.id, user.email, user.username);
        return res.json({token, username: user.username})
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username)
        return res.json({token})
    }
}

module.exports = new UserController()