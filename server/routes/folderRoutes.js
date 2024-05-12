import express from 'express'
const router = express.Router();
import folder from '../controller/foldersController.js'
router.get('',folder.getAllFolders)
router.post('/create',folder.createFolder)
router.delete('/delete/:id',folder.deleteFolder)
router.get('/:id',folder.getByIdFolders)
export default router