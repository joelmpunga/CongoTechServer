import SubFolder from '../model/subFoldersModel.js';
export default class foldersController {

    static async createSubFolder(req, res) {
          try {
            const { titre, description,idFolder } = req.body;
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