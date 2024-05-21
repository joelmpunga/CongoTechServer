import Folder from '../model/foldersModel.js'
import Joi from 'joi';
export default class foldersController {

    static async createFolder(req, res) {
         try {
            const { titre,description } = req.body;
            const schema = Joi.object({
                titre: Joi.string().required(),
                description: Joi.string().allow(''),
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                // Gérer l'erreur de validation
                console.log(error.details[0].message);
                return res.status(400).json(error.details[0].message);
            }
            const folder = new Folder(titre,description);
            const data = await folder.create();
            const response = await folder.getAll()
            res.status(200).json(response)
        }
        catch (error) {
            res.status(500).json(error)
        }    
    }

    static async getAllFolders(req, res) {
        // try{
            const folder = new Folder();
            const data = await folder.getAll().then()
            res.status(200).json(data);
            return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async getByIdFolders(req, res) {
        const id = parseInt(req.params.id);
        console.log("contr : id",req.params.id);
        const folder = new Folder();
        const data = await folder.getById(id).then()
        res.status(200).json(data);
        return data
    }

    static async deleteFolder(req,res){
        const id = parseInt(req.params.id);
        try{
            const folder = new Folder();
            const data = await folder.delete(id)
            const response = await folder.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}