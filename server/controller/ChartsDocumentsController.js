//{getNumberDoc,getNumberDocDate,getNumberDocMonth,getNumberDocCurrentMonth,getNumberDocYear}
import ChartsDocuments from '../model/chartsDocumentsModel.js'
import File from '../model/filesModel.js'
import Joi from 'joi';
export default class ChartsDocumentsController {

    static async getNumberDoc(req, res) {
        // try{
        const chartsDocuments = new ChartsDocuments();
        const data = await chartsDocuments.getAll().then()
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }
    static async getUnClassedDoc(req, res) {
        // try{
        const file = new File()
        const data = file.getAllDraft()
        res.status(200).json(data)
        return data
        // } catch(err) {
        //     res.status(500).json(err)
        // } 
    }
    static async getNumberDocDate(req, res) {
        // try{
        const chartsDocuments = new ChartsDocuments();
        const date = req.params.date
        const data = await chartsDocuments.getDocumentDate(date).then()
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }
}