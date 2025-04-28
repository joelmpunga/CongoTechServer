import File from '../model/filesModel.js'
import multer from 'multer'
import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken'
import Joi from 'joi'
const SECRET_KEY = process.env.SECRET_KEY
import { fileTypeFromBuffer } from 'file-type';
import { readChunk } from 'read-chunk';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const filesPath = path.resolve(__dirname, '..', 'public', 'files');
if (!fs.existsSync(filesPath)) {
    fs.mkdirSync(filesPath, { recursive: true });
  }
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = filesPath + '\\'
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extname = path.extname(file.originalname);
        cb(null, `file_${timestamp}${extname}`);
    }
});
const upload = multer({ storage: storage });
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const prisma = new PrismaClient();
// app.post('/upload', upload.single('file'), async (req, res) => {
//     const buffer = await readChunk('./public/files/' + req.file.filename, { length: 4100 });
//     const type = await fileTypeFromBuffer(buffer);
//     if (type !== null && (type.ext === 'pdf' || type.ext === 'docx' || type.ext === 'jpg' || type.ext === 'png' || type.ext === 'jpeg')) {
//         const result = await prisma.files.create({
//             data: {
//                 name: req.file.filename,
//                 path: req.file.destination.substring(1) + req.file.filename,
//             },
//         });
//         res.status(201).send(`File added with ID: ${result.id}`);
//     } else {
//         res.status(400).send('Invalid file type. Only pdf and docx are allowed.');
//     }
// });
// app.get('/download/:id', async (req, res) => {
//     const file = await prisma.files.findUnique({
//         where: {
//             id: parseInt(req.params.id),
//         },
//     });


//     if (!file) {
//         return res.status(404).send('File not found');
//     }
//     res.download(file.path);
// });

// app.get('/view/:id', async (req, res) => {
//     const file = await prisma.files.findUnique({
//         where: {
//             id: parseInt(req.params.id),
//         },
//     });
//     if (!file) {
//         return res.status(404).send('File not found');
//     }
//     res.sendFile(path.join(__dirname, file.path));
// });

export default class filesController {

    static async setupConfig(req, res) {
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
        const upload = multer({ storage: storage });
        return storage
    }

    static async uploadFile(req, res) {        
         try {
        const schema = Joi.object({
            // email: Joi.string().email().required(),
            // password: Joi.string().min(8).required(),
            // nom: Joi.string().min(2).required(),
            // postnom: Joi.string().min(2).required(),
            idOwner: Joi.number().required(),
            typeDoc: Joi.required(),
            idUser: Joi.number().required(),
            idYear:Joi.number(),
            description: Joi.string().allow(''),
            file: Joi.object({
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                encoding: Joi.string().required(),
                destination: Joi.string().required(),
                filename: Joi.string().required(),
                size: Joi.number().max(8 * 1024 * 1024).required(),
                path: Joi.string().required(),
                // Valider le type de fichier
                mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'application/pdf').required(),
            }).required(),
        })
        const { error, value } = schema.validate({ file: req.file, idOwner: req.body.idOwner,typeDoc: req.body.typeDoc, idUser: req.body.idUser,idYear:req.body.idYear, description: req.body.description });
        if (error) {
            // Gérer l'erreur de validation
            console.log(error.details[0].message);
            return res.status(400).json(error.details[0].message);
        }
        // const Authorization = req.headers.authorization;
        // const token = Authorization.split(' ')[1]
        // const idUser = '';
        // jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({ message: 'Invalid token' });
        //     }
        //     try {
        //         idUser = decoded.userId;
        //         if (!idUser) return res.status(401).json({ message: 'Coordonnées invalide' });
        //     } catch (error) {
        //         res.status(500).json(error);
        //     }
        // });
        const { description, idOwner, typeDoc, idUser, idYear, idSubFolder } = req.body
        
        //const __dirname = path.dirname('/home/joelmpunga/mail-retrieval-app/index.js');
        const buffer = await readChunk('./server/public/files/' + req.file.filename, { length: 4100 });
        const type = await fileTypeFromBuffer(buffer);
        const file = new File()
        const checkFileExists = await file.isNameFileExists(req.file.filename);
        if(checkFileExists !== null) {
            return res.status(404).json({ "message": "File name already exists" });
        }
        if (type !== null && (type.ext === 'pdf')) {
            const data = {
                name: req.file.filename,
                path: req.file.destination.substring(1) + req.file.filename,
                description: description,
                idUser: parseInt(idUser),
                idOwner: parseInt(idOwner),
                type: typeDoc,
                idYear:parseInt(idYear)
            }
            if (idSubFolder) {
                data.idSubFolder = parseInt(idSubFolder)
            }
            file.upload(data)
            res.status(201).json({ "message": "Uploaded successfully" });
        } else {
            res.status(400).json({ "message": "Upload Failed" });
        }
        // const { nom, postnom, email, password, role } = req.body;
        // const user = new User(nom, postnom, email, password, role);
        // const data = await user.signup({ nom, postnom, email, password, role });
        // const response = await user.getAll()
        // res.status(200).json(response);
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getAllFiles(req, res) {
         try {
        const files = new File();
        const data = await files.getAll()
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getAllDraftsFiles(req, res) {
         try {
        const files = new File();
        const data = await files.getAllDraft()
        res.status(200).json(data);
        console.log ('---------', data)
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async getAllEntrantFiles(req,res) {
         try {
            const files = new File();
            const data = await files.getAllEntrant()
            res.status(200).json(data);
            return data
             }
             catch (error) {
                 res.status(500).json(error);
             }
    }

    static async getFilesByIdSubFolder(req, res) {
         try {
        const files = new File();
        const idSub = parseInt(req.params.id)
        const data = await files.getByIdSubFolder(idSub)
        res.status(200).json(data);
        return data
         }
         catch (error) {
             res.status(500).json(error);
         }
    }

    static async downloadFile(req, res) {
        try {
            const files = new File();
            const id = req.params.id;
            const data = await files.download(id)
            if (!data) {
                return res.status(404).send('File not found');
            }
            //res.sendFile(path.join(__dirname, data.path));
            res.download(path.join(process.cwd(), data.path));
            //res.json(data.path)
            return data.path
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async showFile(req, res) {
        try {
            const files = new File();
            const id = req.params.id;
            const data = await files.download(id)
            if (!data) {
                return res.status(404).send('File not found');
            }
            res.sendFile(path.join(process.cwd(), data.path));
            //res.download(data.path);
            //res.json(data.path)
            return data.path
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async classerFile(req, res) {
        const id = parseInt(req.params.id);
        const { idSub } = req.body;
        try {
            const files = new File();
            const data = await files.classer(id, idSub)
            const response = await files.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    static async deleteFile(req, res) {
        const id = parseInt(req.params.id);
        try {
            const files = new File();
            const data = await files.delete(id)
            const response = await files.getAll()
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}