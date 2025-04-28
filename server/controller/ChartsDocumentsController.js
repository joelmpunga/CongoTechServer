//{getNumberDoc,getNumberDocDate,getNumberDocMonth,getNumberDocCurrentMonth,getNumberDocYear}
import ChartsDocuments from '../model/chartsDocumentsModel.js'
import File from '../model/filesModel.js'
import Joi from 'joi';
export default class ChartsDocumentsController {

    static async getNumberDoc(req, res) {
         try{
        const chartsDocuments = new ChartsDocuments();
        const data = await chartsDocuments.getAll().then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }
    static async getUnClassedDoc(req, res) {
         try{
        const file = new File()
        const data = file.getAllDraft()
        res.status(200).json(data)
        return data
         } catch(err) {
             res.status(500).json(err)
         } 
    }
    static async getNumberDocDate(req, res) {
         try{
        const chartsDocuments = new ChartsDocuments();
        const date = req.params.date
        const data = await chartsDocuments.getDocumentDate(date).then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getNumberDocMonth(req, res) {
        try{
            const chartsDocuments = new ChartsDocuments();
            const month = req.params.month
            const currentYear = new Date().getFullYear();
            const data = await chartsDocuments.getDocumentMonth(currentYear+"-"+month+"-").then()
            res.status(200).json(data);
            return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getNumberDocYear(req, res) {
         try{
        const chartsDocuments = new ChartsDocuments();
        const year = req.params.year
        const data = await chartsDocuments.getDocumentYear(year).then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getNumberDocExtension(req, res) {
         try{
        const chartsDocuments = new ChartsDocuments();
        const extension = req.params.extension
        const data = await chartsDocuments.getDocumentExtension(extension).then()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }
}