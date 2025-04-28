import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/usersModel.js';
import dotenv from 'dotenv';
dotenv.config();
import Joi from 'joi';

const SECRET_KEY = process.env.SECRET_KEY;

export default class usersController {
    static async createUser(req, res) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required(),
                nom: Joi.string().min(2).required(),
                postnom: Joi.string().min(2).required(),
                role: Joi.string().valid('ADMIN', 'SECRETAIRE')
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error);
                // Gérer l'erreur de validation
                return res.status(400).json(error.details[0].message);
            }
            const { nom, postnom, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const user = new User(nom, postnom, email, hashedPassword, role);
            const data = await user.signup();
            const response = await user.getAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    static async getAllUsers(req, res) {
        try {
            const users = new User();
            const data = await users.getAll();
            res.status(200).json(data);
            return data;
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required(),
                nom: Joi.string().min(2).required(),
                postnom: Joi.string().min(2).required(),
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error);
                // Gérer l'erreur de validation
                return res.status(400).json(error.details[0].message);
            }
            const { nom, postnom, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const user = new User(nom, postnom, email, hashedPassword);
            const data = await user.update(id);
            const response = await user.getAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }



    static async deleteUser(req, res) {
        const id = parseInt(req.params.id);
        try {
            const users = new User();
            const data = await users.delete(id);
            const response = await users.getAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }



    static async login(req, res) {
        const { email, password } = req.body;

         try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            // Gérer l'erreur de validation
            console.log(error.details[0].message);
            const message = error.details[0].message;
            return res.status(400).json({ message });
        }
        const users = new User();
        const user = await users.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Save the role in session 

        req.session.role = user.role;
        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.nom = user.nom;
        req.session.postnom = user.postnom;

        const userInfos = {
            role: req.session.role,
            nom: req.session.nom,
            postnom: req.session.postnom,
            userId: req.session.userId,
            email: req.session.email,
        }

        // Passwords match, generate JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, userInfos });
         } catch (error) {
             res.status(500).json(error);
         }
    }

    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json("Une erreur serveur s'est produite " + err)
            } else {
                res.status(200).json("Logout done Successfully")
            }
        });
    };

    static async getProfile(req, res) {
        // Assuming a token is sent in the Authorization header
        const Authorization = req.headers.authorization;
        const token = Authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Missing token' });
        }

        // Verify token
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            try {
                const users = new User();
                const user = await users.getById(decoded.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ user: { id: user.id, role: user.role } });
            } catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
