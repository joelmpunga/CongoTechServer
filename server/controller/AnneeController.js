import Annee from '../model/AnneeModel.js'
import Joi from 'joi';
export default class AnneeController {

    static async createAnnee(req, res) {        
          try {
            const {debut, fin} = req.body;
            const schema = Joi.object({
                debut: Joi.required(),
                fin: Joi.required(),
            })
            const { error, value } = schema.validate(req.body);
            if (error) {
                // Gérer l'erreur de validation
                console.log(error.details[0].message);
                return res.status(400).json(error.details[0].message);
            }
            const annee = new Annee(debut,fin);
            const data = await annee.create();
            const response = await annee.getAll()
            res.status(200).json(response)
        }
        catch (error) {
            res.status(500).json(error)
        }    
    }

    static async getAllAnnees(req, res) {
         try{
            const annee = new Annee();
            const data = await annee.getAll().then()
            res.status(200).json(data);
            return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getByIdAnnee(req, res) {
        const id = parseInt(req.params.id);
        const annee = new Annee();
        const data = await annee.getById(id).then()
        res.status(200).json(data);
        return data
    }

    static async setEnCoursAnnee(req, res) {
        const id = parseInt(req.params.id);
        const annee = new Annee();
        const data = await annee.setAnneeEnCours(id).then()
        res.status(200).json(data);
        return data
    }

    static async setCloturerAnneeEnCours(req, res) {
        const id = parseInt(req.params.id);
        const annee = new Annee();
        const data = await annee.setCloturerAnnee(id).then()
        res.status(200).json(data);
        return data
    }

    static async deleteAnnee(req,res){
        const id = parseInt(req.params.id);
        try{
            const annee = new Annee();
            const data = await annee.delete(id)
            const response = await annee.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}