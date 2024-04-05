import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import ownersRoutes from './routes/ownerRoutes.js';
import foldersRoutes from './routes/folderRoutes.js';
import subfolderRoutes from './routes/subFolderRoutes.js';
const port = 3000 || process.env.PORT
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use('/user', userRoutes);
        this.server.use('/file', fileRoutes);
        this.server.use('/owner', ownersRoutes)
        this.server.use('/folder', foldersRoutes)
        this.server.use('/subfolder', subfolderRoutes)
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