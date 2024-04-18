import SubFolder from '../model/subFoldersModel.js';
import Joi from 'joi';
export default class foldersController {

    static async createSubFolder(req, res) {
          try {
            const { titre, description,idFolder } = req.body;
            const schema = Joi.object({
                titre: Joi.string().required(),
                description: Joi.string().allow(''),
                idFolder: Joi.number().required()
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                // Gérer l'erreur de validation
                console.log(error.details[0].message);
                return res.status(400).json(error.details[0].message);
            }
            const subfolder = new SubFolder(titre, description,parseInt(idFolder));
            const data = await subfolder.create();
            const response = await subfolder.getAll()
            res.status(200).json(response)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllSubFolders(req, res) {
        try {
            const subFolder = new SubFolder();
            const data = await subFolder.getAll().then()
            res.status(200).json(data);
            return data
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async getSubFoldersByIdFolder(req, res) {
        try {
            const id = parseInt(req.params.id);
            const subFolder = new SubFolder();
            const data = await subFolder.getAllByIdFolder(id).then()
            res.status(200).json(data);
            return data
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteSubFolder(req, res) {
        const id = parseInt(req.params.id);
        try {
            const subFolder = new SubFolder();
            const data = await subFolder.delete(id)
            const response = await subFolder.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}