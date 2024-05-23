import ChartsOwners from '../model/chartsOwners.js'
import Joi from 'joi';
export default class ChartsUsersController {

    static async getNumberOwner(req, res) {
        // try{
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAll().then()
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }
    static async getNumberParticulier(req, res) {
        // try{
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAllParticulier()
        res.status(200).json(data)
        return data
        // } catch(err) {
        //     res.status(500).json(err)
        // } 
    }

    static async getNumberEntreprise(req, res) {
        // try{
        console.log("Controller Entreprise");
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAllEntreprise()
        res.status(200).json(data)
        console.log(data);
        return data
        // } catch(err) {
        //     res.status(500).json(err)
        // } 
    }
}