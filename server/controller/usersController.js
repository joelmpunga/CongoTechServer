import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/usersModel.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export default class usersController {
    static async createUser(req, res) {
        try {
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
            const user = await User.getByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Passwords match, generate JWT
            const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    }







}
