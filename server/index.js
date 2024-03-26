import express from 'express';
//const express = require('express');
//const multer = require('multer');
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import ownersRoutes from './routes/ownerRoutes.js';
import foldersRoutes from './routes/folderRoutes.js';
import subfolderRoutes from './routes/subFolderRoutes.js';
//const fileRoutes = require('./routes/fileRoutes.js');
//const fileRoutes = require('./routes/fileRoutes.js');
const port = 3000 || process.env.PORT
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        //this.server.use(express.static(__dirname + '/public'));
        this.server.use('/user', userRoutes);
        this.server.use('/file',fileRoutes);
        this.server.use('/owner',ownersRoutes)
        this.server.use('/folder',foldersRoutes)
        this.server.use('/subfolder',subfolderRoutes)
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}, to run project http://localhost:${port}`);
        });
    }
}
const app = new App();
app.start();

// const __dirname = path.dirname('/home/joelmpunga/mail-retrieval-app/index.js');

// const buffer = await readChunk('./public/images/_SMN9578.jpg', { length: 4100 });
// import { PrismaClient } from '@prisma/client';
// const type = await fileTypeFromBuffer(buffer);
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = './public/images/';
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const timestamp = Date.now();
//         const extname = path.extname(file.originalname);
//         cb(null, `file_${timestamp}${extname}`);
//     }
// });
// const upload = multer({ storage: storage });
// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// const prisma = new PrismaClient();
// app.post('/upload', upload.single('file'), async (req, res) => {
//     const buffer = await readChunk('./public/images/' + req.file.filename, { length: 4100 });
//     const type = await fileTypeFromBuffer(buffer);
//     if (type !== null && (type.ext === 'pdf' || type.ext === 'docx')) {
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

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });