import express from 'express'
import multer from 'multer'
const router = express.Router()
import fileConst from '../controller/filesController.js'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './server/public/files/';
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        //const timestamp = Date.now();
        //const extname = path.extname(file.originalname);
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })
router.post('/upload', upload.single('file'),fileConst.uploadFile)
router.get('',fileConst.getAllFiles)
router.get('/download/:id',fileConst.downloadFile)
router.get('/show/:id',fileConst.showFile)
router.put('/classer/:id',fileConst.classerFile)
router.get('/:id',fileConst.getFilesByIdSubFolder)
router.get('/draft',fileConst.getAllDraftsFiles)
router.delete('/delete/:id',fileConst.deleteFile)
router.get('/show/:id',fileConst.showFile)
export default router