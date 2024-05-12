import express from 'express'
const router = express.Router();
import subFolder from '../controller/subFolderController.js'
router.get('',subFolder.getAllSubFolders)
router.post('/create',subFolder.createSubFolder)
router.delete('/delete/:id',subFolder.deleteSubFolder)
router.get('/:id',subFolder.getSubFoldersByIdFolder)
router.get('/getbyid/:id',subFolder.getByIdSubFolders)
export default router