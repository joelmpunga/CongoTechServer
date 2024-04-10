import File from '../model/filesModel.js'
import multer from 'multer'
import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken'
const __dirname = path.dirname('/home/joelmpunga/Documents/MyAllProjects/ArchivageFECProject/server');

console.log(__dirname);
const SECRET_KEY = process.env.SECRET_KEY
import { fileTypeFromBuffer } from 'file-type';
import { readChunk } from 'read-chunk';
import { PrismaClient } from '@prisma/client';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './server/public/files/';
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
        // try {
        // const Authorization = req.headers.authorization;
        // const token = Authorization.split(' ')[1]
        // const idUser = '';
        // jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({ message: 'Invalid token' });
        //     }
        //     try {
        //         idUser = decoded.userId;
        //         console.log(decoded);
        //         console.log(idUser);
        //         if (!idUser) return res.status(401).json({ message: 'Coordonnées invalide' });
        //     } catch (error) {
        //         res.status(500).json(error);
        //     }
        // });
        const { description, idOwner, idUser } = req.body
        //const __dirname = path.dirname('/home/joelmpunga/mail-retrieval-app/index.js');
        const buffer = await readChunk('./server/public/files/' + req.file.filename, { length: 4100 });
        const type = await fileTypeFromBuffer(buffer);
        const file = new File()
        if (type !== null && (type.ext === 'pdf' || type.ext === 'docx' || type.ext === 'jpg' || type.ext === 'png' || type.ext === 'jpeg')) {
            const data = {
                name: req.file.filename,
                path: req.file.destination.substring(1) + req.file.filename,
                description: description,
                idUser: parseInt(idUser),
                idOwner: parseInt(idOwner)
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
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async getAllFiles(req, res) {
        // try {
        const files = new File();
        const data = await files.getAll()
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async getAllDraftsFiles(req, res) {
        // try {
        const files = new File();
        const data = await files.getAllDraft()
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async getFilesByIdSubFolder(req, res) {
        // try {
        const files = new File();
        const idSub = parseInt(req.params.id)
        const data = await files.getByIdSubFolder(idSub)
        res.status(200).json(data);
        return data
        // }
        // catch (error) {
        //     res.status(500).json(error);
        // }
    }

    static async downloadFile(req, res) {
        try {
            const files = new File();
            const id = req.params.id;
            const data = await files.download(id)
            if (!data) {
                return res.status(404).send('File not found');
            }
            res.sendFile(path.join(__dirname, data.path));
            //res.download(data.path);
            return data
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
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}