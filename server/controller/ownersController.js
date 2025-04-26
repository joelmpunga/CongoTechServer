import Owner from '../model/ownersModel.js'
import Joi from 'joi';
export default class ownersController {

    static async createOwner(req, res) {
        // try {
            const { nom, description } = req.body;
            const schema = Joi.object({
                nom: Joi.string().required().min(2),
                description: Joi.string().allow(''),
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                // Gérer l'erreur de validation
                console.log(error.details[0].message);
                return res.status(400).json(error.details[0].message);
            }
            const owner = new Owner(nom, description);
            const data = await owner.create();
            const response = await owner.getAll()
            res.status(200).json(response)
        // }
        // catch (error) {
        //     res.status(500).json(error)
        // }    
    }

    static async getAllOwners(req, res) {
        try{
            const owners = new Owner();
            const data = await owners.getAll().then()
            res.status(200).json(data);
            return data
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteOwner(req,res){
        const id = parseInt(req.params.id);
        try{
            const owners = new Owner();
            const data = await owners.delete(id)
            const response = await owners.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}