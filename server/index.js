import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import ownersRoutes from './routes/ownerRoutes.js';
import foldersRoutes from './routes/folderRoutes.js';
import subfolderRoutes from './routes/subFolderRoutes.js';
import chartsDocumentsRoutes from './routes/chartsDocumentsRoutes.js';
import chartsUsersRoutes from './routes/chartsUsersRoutes.js';
import chartsOwnersRoutes from './routes/chartsOwnersRoutes.js';
import anneeRoutes from './routes/AnneeRoutes.js'
import session from 'express-session'
const port = 3000 || process.env.PORT
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import emailRoutes from './routes/EmailRoutes.js';

class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60,
                secure: false,
              }
        }));
        
        this.server.use('/user', userRoutes);
        this.server.use('/file',fileRoutes);
        this.server.use('/owner',ownersRoutes)
        this.server.use('/folder',foldersRoutes)
        this.server.use('/subfolder',subfolderRoutes)
        this.server.use('/emails', emailRoutes)
        this.server.use('/file', fileRoutes);
        this.server.use('/owner', ownersRoutes)
        this.server.use('/folder', foldersRoutes)
        this.server.use('/subfolder', subfolderRoutes)
        this.server.use('/charts/document',chartsDocumentsRoutes)
        this.server.use('/charts/user', chartsUsersRoutes)
        this.server.use('/charts/owner',chartsOwnersRoutes)
        this.server.use('/years',anneeRoutes)
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}, to run project http://localhost:${port}`);
        });
    }
}
const app = new App();
app.start();
export default app.server