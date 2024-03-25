import Owner from '../model/ownersModel.js'
export default class ownersController {

    static async createOwner(req, res) {
        try {
            const { nom, type,description } = req.body;
            const owner = new Owner(nom, type,description);
            const data = await owner.create();
            const response = await owner.getAll()
            res.status(200).json(response)
        }
        catch (error) {
            res.status(500).json(error)
        }    
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