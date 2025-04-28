import ChartsUsers from '../model/chartsUsersModel.js'
import User from '../model/usersModel.js'
import Joi from 'joi';
export default class ChartsUsersController {

    static async getNumberUser(req, res) {
         try{
        const chartsUsers = new ChartsUsers();
        const data = await chartsUsers.getAll().then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }
    static async getNumberSecretaire(req, res) {
         try{
        const chartsUsers = new ChartsUsers();
        const data = await chartsUsers.getAllSecretaire()
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         } 
    }

    static async getNumberAdmin(req, res) {
         try{
        const chartsUsers = new ChartsUsers();
        const data = await chartsUsers.getAllAdmin()
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         } 
    }
}