import ChartsOwners from '../model/chartsOwners.js'
import Joi from 'joi';
export default class ChartsUsersController {

    static async getNumberOwner(req, res) {
         try{
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAll().then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }
    static async getNumberParticulier(req, res) {
         try{
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAllParticulier().then()
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         } 
    }

    static async getNumberParticulierMonth(req, res) {
         try{
        const chartsOwners = new ChartsOwners();
        const currentYear = new Date().getFullYear();
        const month = req.params.month
        const data = await chartsOwners.getParticulierMonth(currentYear+"-"+month+"-")
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         }
    }

    static async getNumberEntrepriseMonth(req, res) {
        try{
        const chartsOwners = new ChartsOwners();
        const currentYear = new Date().getFullYear();
        const month = req.params.month
        const data = await chartsOwners.getEntrepriseMonth(currentYear+"-"+month+"-")
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         }
    }

    static async getNumberEntreprise(req, res) {
         try{
        const chartsOwners = new ChartsOwners();
        const data = await chartsOwners.getAllEntreprise().then()
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         } 
    }

    static async getOwnerType(req, res) {
         try{
        const chartsOwners = new ChartsOwners();
        const type = req.params.type
        const data = await chartsOwners.getOwnerType(type)
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         }
    }
}