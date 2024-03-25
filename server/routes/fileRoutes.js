import express from 'express'
import multer from 'multer'
import * as path from 'path'
const __dirname = path.dirname('/home/joelmpunga/Documents/MyAllProjects/ArchivageFECProject/server/index.js');
const router = express.Router()
import fileConst from '../controller/filesController.js'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './public/files/';
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extname = path.extname(file.originalname);
        cb(null, `file_${timestamp}${extname}`);
    }
});
const upload = multer({ storage: storage })
router.post('/upload', upload.single('file'),fileConst.uploadFile)
router.get('',fileConst.getAllFiles)
router.get('/download/:id',fileConst.downloadFile)
router.put('/classer/:id',fileConst.classerFile)
export default router