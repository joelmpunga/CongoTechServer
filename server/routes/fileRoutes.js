import express from 'express';
import multer from 'multer';
const router = express.Router();
import file from '../controller/filesController.js'
const storage = file.setupConfig().then()
const upload = multer({ storage: storage });
router.get('',file.getAllFiles)
router.post('/upload', upload.single('file'))
export default router