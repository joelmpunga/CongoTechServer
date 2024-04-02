import User from '../model/usersModel.js'
export default class usersController {

    static async createUser(req, res) {
        try {
            const { nom, postnom, email, password, role } = req.body;
            const user = new User(nom, postnom, email, password, role);
            const data = await user.signup();
            const response = await user.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }        
    }

    static async getAllUsers(req, res) {
        // try{
            const users = new User();
            const data = await users.getAll()
            res.status(200).json(data);
            return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async deleteUser(req,res){
        const id = parseInt(req.params.id);
        try{
            const users = new User();
            const data = await users.delete(id)
            const response = await users.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}